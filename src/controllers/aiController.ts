import { Request, Response } from "express";
import * as aiService from "../services/aiService";
import { TransactionModel } from "../database/mongooseTransactions";

export const chat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "A chave 'message' é obrigatória no corpo da requisição."
      });
    }

    const transactions = await TransactionModel.find().sort({ date: -1 }).exec();

    const reply = await aiService.financialAssistant(message, transactions);

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Erro no chat controller:", error);
    return res.status(500).json({
      message: "Ocorreu um erro ao processar sua solicitação."
    });
  }
};
