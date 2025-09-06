import { Request, Response } from "express";
import { PurchaseService, CreatePurchaseDTO } from "../services/purchaseService";
import { ProductRepository } from "../repositories/productRepository";

const service = new PurchaseService();
const productRepo = new ProductRepository();

export const checkout = async (req: Request, res: Response) => {
  const { cart } = req.body;

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ message: "Dados da compra inválidos." });
  }

  const items: CreatePurchaseDTO["items"] = await Promise.all(
    cart.map(async (item: any) => {
      const product = await productRepo.getProductById(String(item.productId));
      if (!product) throw new Error(`Produto ${item.productId} não encontrado`);
      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: Number(item.quantity),
      };
    })
  );

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (total > 20000) {
    return res.status(400).json({ message: "O valor total da compra excede o limite de R$20.000." });
  }

  try {
    const purchase = await service.create({ total, items });

    const response = {
      id: purchase.id,
      date: purchase.date,
      total: purchase.total,
      items: items.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    res.status(201).json(response);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Erro ao processar compra." });
  }
};
