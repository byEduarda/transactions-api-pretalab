import { Request, Response } from "express";
import { TransactionService } from "../services/transactionService";

const service = new TransactionService();

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const { type, category, startDate, endDate, minAmount, maxAmount } = req.query;

    const filter = {
      type: type as "income" | "expense" | undefined,
      category: category as string | undefined,
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
      minAmount: minAmount ? Number(minAmount) : undefined,
      maxAmount: maxAmount ? Number(maxAmount) : undefined,
    };

    const transactions = await service.getAll(filter);
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao listar transações." });
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const transaction = await service.getById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transação não encontrada." });

    res.status(200).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar transação." });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { description, amount, type, category, date } = req.body;

    if (!description || typeof amount !== "number" || !type || !category || !date) {
      return res.status(400).json({ message: "Dados da transação inválidos." });
    }

    const transaction = await service.create({
      description,
      amount,
      type,
      category,
      date: new Date(date),
    });

    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao criar transação." });
  }
};
