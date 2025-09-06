import { Router } from "express";
import * as transactionController from "../controllers/transactionsController";

const router = Router();

router.get("/", transactionController.getAllTransactions);
router.get("/:id", transactionController.getTransaction);
router.post("/", transactionController.createTransaction);

export default router;