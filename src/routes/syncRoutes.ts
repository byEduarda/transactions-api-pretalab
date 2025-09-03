import { Router } from "express";
import { startSync } from "../controllers/syncController";

const router = Router();

router.post("/", startSync);

export default router;
