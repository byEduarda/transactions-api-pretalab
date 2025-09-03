import { Router } from "express";
import { startSync } from "../controllers/syncController";

const router = Router();

router.post("/sync-products", startSync);

export default router;
