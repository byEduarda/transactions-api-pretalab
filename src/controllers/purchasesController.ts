import { Request, Response } from "express";
import { PurchaseService } from "../services/purchaseService";

const service = new PurchaseService();

export const getAllPurchases = (req: Request, res: Response) => {
  const purchases = service.getAll();
  res.status(200).json(purchases);
};

export const getPurchaseById = (req: Request, res: Response) => {
  const purchase = service.getById(req.params.id);
  if (!purchase) return res.status(404).json({ message: "Compra não encontrada." });
  res.status(200).json(purchase);
};

export const checkout = (req: Request, res: Response) => {
  const { cart, total } = req.body;

  if (!cart || !Array.isArray(cart) || cart.length === 0 || typeof total !== "number") {
    return res.status(400).json({ message: "Dados da compra inválidos." });
  }

  if (total > 20000) {
    return res.status(400).json({ message: "O valor total da compra excede o limite de R$20.000." });
  }

  const items = cart.map((item: any) => ({
    productId: item.productId,
    quantity: item.quantity,
    name: item.name || `Produto ${item.productId}`,
    price: item.price || 0
  }));

  service.create({ date: new Date(), total, items });

  res.status(200).json({ message: "Compra processada com sucesso!" });
};
