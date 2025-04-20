import express, { Request, Response } from "express";
import * as postController from "../controllers/post.controller";

const router = express.Router();

// Other routes
router.get("/", postController.getAll);

export default router;
