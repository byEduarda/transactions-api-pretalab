import { Schema, model } from "mongoose";

export interface ITransaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: Date;
}

const transactionSchema = new Schema<ITransaction>({
  id: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export const TransactionModel = model<ITransaction>("Transaction", transactionSchema);
