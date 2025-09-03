import { Schema, model } from "mongoose";

export interface Transaction {
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: Date;
}

const transactionSchema = new Schema<Transaction>({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
}, { timestamps: true });

export const TransactionModel = model<Transaction>("Transaction", transactionSchema);