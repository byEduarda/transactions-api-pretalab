import mongoose, { Schema, model, Document } from "mongoose";
import { Transaction } from "../domain/Transaction";

export interface TransactionDocument extends Transaction, Document {}

const transactionSchema = new Schema<TransactionDocument>({
  date: { type: Date, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true }
});

const TransactionModel = model<TransactionDocument>("Transaction", transactionSchema);

export class TransactionRepository {
  findAll(filters?: any) {
    return TransactionModel.find(filters).exec();
  }

  findById(id: string) {
    return TransactionModel.findById(id).exec();
  }

  create(transaction: Transaction) {
    return new TransactionModel(transaction).save();
  }
}
