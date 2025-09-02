import { Request, Response } from "express";
import { ProductService } from "../services/productsService";

const service = new ProductService();

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await service.getAll();
  res.status(200).json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await service.getById(req.params.id);
  if (!product) return res.status(404).json({ message: "Produto não encontrado." });
  res.status(200).json(product);
};
