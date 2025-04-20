import { NextFunction, Request, RequestHandler, Response } from "express";
import redisClient from "../services/redis.service";
import config from "../config";

const WINDOW_SECONDS = config.rateLimiter.ttl;
const MAX_REQUESTS = config.rateLimiter.maxRequest;

// TODO: passing config to it
const rateLimiter = (): RequestHandler => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const ip = request.ip || request.headers["x-forwarded-for"];
      const path = request.path;
      const method = request.method.toLowerCase();

      const key = `rate-limit:${ip}:${method}:${path}`;

      // check if key exist on redis
      const existingValue = await redisClient.get(key);

      if (!existingValue) await redisClient.setex(key, WINDOW_SECONDS, 1);

      const current = existingValue ? parseInt(existingValue) : 1;

      if (current >= MAX_REQUESTS) {
        response.status(429).json({
          message: `Rate limit exceeded, try again later `,
        });

        return;
      }

      await redisClient.incr(key);

      // Optionally set headers for client
      response.setHeader("X-RateLimit-Limit", MAX_REQUESTS);
      response.setHeader("X-RateLimit-Reset", await redisClient.ttl(key));
      response.setHeader(
        "X-RateLimit-Remaining",
        Math.max(0, MAX_REQUESTS - current)
      );

      next();
    } catch (error) {
      console.error("RateLimiter middleware error", error);
      next(); // allow all
    }
  };
};

export default rateLimiter;
