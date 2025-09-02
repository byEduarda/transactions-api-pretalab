import { Request, Response } from "express";
import { TransactionService } from "../services/transactionService";

const service = new TransactionService();

export const listTransactions = (req: Request, res: Response) => service.list(req.query).then(r => res.json(r));
export const getTransaction = (req: Request, res: Response) =>
  service.getById(req.params.id).then(r => r ? res.json(r) : res.status(404).json({ message: "Transação não encontrada." }));
export const createTransaction = (req: Request, res: Response) =>
  service.create(req.body).then(r => res.status(201).json(r));
