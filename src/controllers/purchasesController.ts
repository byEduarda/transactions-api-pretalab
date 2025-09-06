import { Request, Response } from "express";
import { PurchaseService } from "../services/purchaseService";

const service = new PurchaseService();

export const getAllPurchases = async (_req: Request, res: Response) => {
  try {
    const purchases = await service.getAll();
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar as compras.", error });
  }
};

export const getPurchaseById = async (req: Request, res: Response) => {
  try {
    const p = await service.getById(req.params.id);
    if (!p) {
      return res.status(404).json({ message: "Compra não encontrada." });
    }
    res.status(200).json(p);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar a compra.", error });
  }
};