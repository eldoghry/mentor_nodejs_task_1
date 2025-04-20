import { Request, Response } from "express";

const checkHealth = (_req: Request, res: Response) => {
  res.status(200).json({ status: "OK", message: "API is healthy" });
};

export { checkHealth };
