import { join } from "path";
import * as dotenv from "dotenv";
dotenv.config({
  path: join(process.cwd(), "env", `${process.env.NODE_ENV}.env`),
});
import config from "./config";
import app from "./app";
import redisClient from "./services/redis.service";

const PORT = config.port;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const server = app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);

  try {
    await redisClient.ping();
    console.log("Connected to Redis successfully");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
  }
});

server.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(async () => {
    await redisClient.quit();
    console.log("HTTP server closed");
  });
});

export default server;
