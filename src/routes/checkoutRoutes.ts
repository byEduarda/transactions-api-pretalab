import { Router } from "express";
import { checkout } from "../controllers/checkoutController";

const router = Router();

router.post("/", checkout);

export default router;
