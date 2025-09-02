import { PurchaseRepository } from "../repositories/purchaseRepository";
import { Purchase, PurchaseItem } from "../domain/Purchase";

export class PurchaseService {
  private repo = new PurchaseRepository();

  getPurchases() {
    return this.repo.findAll();
  }

  getPurchaseById(id: string) {
    return this.repo.findById(id);
  }

  createPurchases(data: { date: Date; total: number; items: PurchaseItem[] }) {
    return this.repo.create({
      date: data.date instanceof Date ? data.date : new Date(data.date),
      total: data.total,
      items: data.items
    });
  }
}

const service = new PurchaseService();

export const getPurchases = () => service.getPurchases();
export const purchaseById = (id: string) => service.getPurchaseById(id);
export const createPurchase = (data: { date: Date; total: number; items: PurchaseItem[] }) =>
  service.createPurchases(data);
