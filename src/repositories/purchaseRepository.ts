import mongoose, { Schema, model, Document } from "mongoose";
import { Purchase, PurchaseItem } from "../domain/Purchase";

export interface PurchaseDocument extends Purchase, Document {}

const itemSchema = new Schema<PurchaseItem>({
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

const purchaseSchema = new Schema<PurchaseDocument>({
  date: { type: Date, required: true },
  total: { type: Number, required: true },
  items: { type: [itemSchema], required: true }
});

const PurchaseModel = model<PurchaseDocument>("Purchase", purchaseSchema);

export class PurchaseRepository {
  findAll() {
    return PurchaseModel.find().sort({ date: -1 }).exec();
  }

  findById(id: string) {
    return PurchaseModel.findById(id).exec();
  }

  create(purchase: Purchase) {
    return new PurchaseModel(purchase).save();
  }
}
