import { Router } from "express";
import { getAllPurchases, getPurchaseById, checkout } from "../controllers/purchasesController";

const router = Router();

router.post("/checkout", checkout);
router.get("/", getAllPurchases);
router.get("/:id", getPurchaseById);


export default router;
