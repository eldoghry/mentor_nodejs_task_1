import express, { Request, Response } from "express";
import generalRouters from "./general.router";
import postRouters from "./post.router";

const router = express.Router();

router.use("/posts", postRouters);
router.use("/", generalRouters);

export default router;
