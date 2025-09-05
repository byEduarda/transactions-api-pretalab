import { Request, Response } from "express";
import * as transactionService from "../services/transactionService";

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const filters = {
      type: req.query.type as "income" | "expense" | undefined,
      category: req.query.category as string | undefined,
      startDate: req.query.startDate as string | undefined,
      endDate: req.query.endDate as string | undefined,
      minAmount: req.query.minAmount ? Number(req.query.minAmount) : undefined,
      maxAmount: req.query.maxAmount ? Number(req.query.maxAmount) : undefined,
    };

    const transactions = await transactionService.getAllTransactions(filters);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar transações", error });
  }
};

export const getTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await transactionService.getTransactionById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transação não encontrada." });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar transação", error });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const transaction = await transactionService.create(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar transação", error });
  }
};
