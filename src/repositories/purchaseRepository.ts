import { Purchase } from "../domain/Purchases";
import { randomUUID } from "crypto";

export class PurchaseRepository {
  private purchases: Purchase[] = [];

  getAll(): Purchase[] {
    return this.purchases;
  }

  getById(id: string): Purchase | undefined {
    return this.purchases.find(p => p.id === id);
  }

  create(purchase: Omit<Purchase, "id">): Purchase {
    const newPurchase: Purchase = { id: randomUUID(), ...purchase };
    this.purchases.push(newPurchase);
    return newPurchase;
  }
}
