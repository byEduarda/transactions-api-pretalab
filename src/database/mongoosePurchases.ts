import mongoose, { Schema, Document } from "mongoose";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Purchase extends Document {
  id: string; 
  date: Date;
  total: number;
  items: CartItem[];
}

const CartItemSchema = new Schema<CartItem>({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const PurchaseSchema = new Schema<Purchase>({
  id: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  total: { type: Number, required: true },
  items: { type: [CartItemSchema], required: true },
});

export const PurchaseModel = mongoose.model<Purchase>("Purchase", PurchaseSchema);
