import { Schema, model, Document } from 'mongoose';

export interface IPurchaseItem {
  productId: string;
  quantity: number;
  name: string;
  price: number;
}

export interface IPurchase extends Document {
  date: Date; 
  total: number;
  items: IPurchaseItem[];
}

const purchaseItemSchema = new Schema<IPurchaseItem>({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
}, { _id: false });

const purchaseSchema = new Schema<IPurchase>({
  date: {
    type: Date,
    default: Date.now, 
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  items: [purchaseItemSchema], 
});

const PurchaseModel = model<IPurchase>('Purchase', purchaseSchema);

export default PurchaseModel;