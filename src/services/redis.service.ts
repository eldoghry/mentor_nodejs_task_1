import Redis from "ioredis";
import config from "../config";

const redisClient = new Redis(config.redis.uri);

redisClient.on("error", (error) => {
  console.error("Redis connection error:", error);
});

export default redisClient;
