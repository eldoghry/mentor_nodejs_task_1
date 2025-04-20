import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import apiRouter from "./routes";

const app: Express = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api/v1", apiRouter);

// Error Handler for unknown routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    statusCode: 404,
    error: "resource not found.",
  });
});

export default app;
