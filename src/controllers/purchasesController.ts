import { Request, Response } from "express";
import { PurchaseService } from "../services/purchaseService";

const service = new PurchaseService();

export const getAllPurchases = async (_req: Request, res: Response) => {
  const purchases = await service.getAll();

  const response = purchases.map(p => ({
    id: p.id,
    date: p.date,
    total: p.total,
    items: p.items.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  }));

  res.status(200).json(response);
};

export const getPurchaseById = async (req: Request, res: Response) => {
  const p = await service.getById(req.params.id);
  if (!p) return res.status(404).json({ message: "Compra não encontrada." });

  const response = {
    id: p.id,
    date: p.date,
    total: p.total,
    items: p.items.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  };

  res.status(200).json(response);
};
