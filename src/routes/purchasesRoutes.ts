import { Router } from "express";
import { listPurchases, getPurchase, checkout } from "../controllers/purchasesController";

const router = Router();

router.get("/", listPurchases);
router.get("/:id", getPurchase);
router.post("/checkout", checkout);

export default router;
