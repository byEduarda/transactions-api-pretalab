import { PurchaseRepository } from "../repositories/purchaseRepository";
import { Purchase } from "../domain/Purchases";

export class PurchaseService {
  private repository: PurchaseRepository;

  constructor() {
    this.repository = new PurchaseRepository();
  }

  getAll(): Purchase[] {
    return this.repository.getAll();
  }

  getById(id: string): Purchase | undefined {
    return this.repository.getById(id);
  }

  create(purchase: Omit<Purchase, "id">): Purchase {
    return this.repository.create(purchase);
  }
}
