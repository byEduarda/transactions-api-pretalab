import { Request, Response } from "express";
import { PurchaseService, CreatePurchaseDTO } from "../services/purchaseService";

const service = new PurchaseService();

export const checkout = async (req: Request, res: Response) => {
  const { cart } = req.body;

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ message: "Dados da compra inválidos." });
  }

  const items: CreatePurchaseDTO["items"] = cart.map((item: any) => ({
    productId: String(item.productId),
    quantity: Number(item.quantity) || 1,
    name: String(item.name || `Produto ${item.productId}`),
    price: Number(item.price) || 0,
  }));

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (total > 20000) {
    return res.status(400).json({ message: "O valor total da compra excede o limite de R$20.000." });
  }

  try {
    const purchase = await service.create({ total, items });

    res.status(201).json({
      id: purchase.id,
      date: purchase.date,
      total: purchase.total,
      items: purchase.items.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Erro ao processar compra." });
  }
};
