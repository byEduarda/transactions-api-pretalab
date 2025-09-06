import { Request, Response } from "express";
import { TransactionService } from "../services/transactionService";

const transactionService = new TransactionService();

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await transactionService.getAllTransactions(req.query);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter transações", error });
  }
};

export const getTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await transactionService.getTransactionById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transação não encontrada" });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar transação", error });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await transactionService.create(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar transação", error });
  }
};
