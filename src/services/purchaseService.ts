import { PurchaseModel, Purchase } from "../database/mongoosePurchases";

export interface CreatePurchaseDTO {
  total: number;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
}

export class PurchaseService {
  async getAll(): Promise<Purchase[]> {
    return PurchaseModel.find().sort({ id: 1 }).exec();
  }

  async getById(id: string): Promise<Purchase | null> {
    return PurchaseModel.findOne({ id }).exec();
  }

  async create(purchase: CreatePurchaseDTO): Promise<Purchase> {
    if (purchase.total > 20000) {
      throw new Error("O valor total da compra excede o limite de R$20.000.");
    }

    const count = await PurchaseModel.countDocuments();
    const nextId = (count + 1).toString();

    const newPurchase = new PurchaseModel({
      ...purchase,
      id: nextId,
      date: new Date(),
    });

    return newPurchase.save();
  }
}
