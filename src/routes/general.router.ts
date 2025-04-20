import { Router } from "express";
import { checkHealth } from "../controllers/general.controller";

const router = Router();

// health routes
router.get("/health", checkHealth);

export default router;
