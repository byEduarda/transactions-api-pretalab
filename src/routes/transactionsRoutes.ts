import { Router } from "express";
import { listTransactions, getTransaction, createTransaction } from "../controllers/transactionsController";

const router = Router();

router.get("/", listTransactions);
router.get("/:id", getTransaction);
router.post("/", createTransaction);

export default router;
