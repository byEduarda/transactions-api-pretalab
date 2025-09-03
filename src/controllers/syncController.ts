import { Request, Response } from 'express';
import { syncProducts } from '../externalAPI/finshopping';

export const startSync = async (req: Request, res: Response) => {
  try {
    await syncProducts();
    res.status(200).json({ message: "Sincronização de produtos iniciada com sucesso!" });
  } catch (error) {
    console.error("Erro ao iniciar a sincronização:", error);
    res.status(500).json({ message: "Erro ao sincronizar os produtos." });
  }
};