import { Transaction, transactions as initialTransactions } from "../models/Transactions";
import { v4 as uuid } from "uuid";

export interface TransactionInput {
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date?: string; // opcional
}

export interface TransactionFilters {
  type?: "income" | "expense";
  category?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

export class TransactionService {
  private transactions: Transaction[] = [...initialTransactions];

  getAllTransactions(filters?: TransactionFilters): Transaction[] {
    let result = [...this.transactions];
    if (filters?.type) result = result.filter(t => t.type === filters.type);
    if (filters?.category) result = result.filter(t => t.category === filters.category);
    if (filters?.startDate) {
      const start = new Date(filters.startDate).getTime();
      result = result.filter(t => new Date(t.date).getTime() >= start);
    }
    if (filters?.endDate) {
      const end = new Date(filters.endDate).getTime();
      result = result.filter(t => new Date(t.date).getTime() <= end);
    }
    if (filters?.minAmount !== undefined) result = result.filter(t => t.amount >= filters.minAmount!);
    if (filters?.maxAmount !== undefined) result = result.filter(t => t.amount <= filters.maxAmount!);

    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getTransactionById(id: string): Transaction | undefined {
    return this.transactions.find(t => t.id === id);
  }

  create(data: TransactionInput): Transaction {
    const lastTransaction = this.transactions[this.transactions.length - 1];
    const nextId = lastTransaction ? (parseInt(lastTransaction.id) + 1).toString() : "1";

    const transaction: Transaction = {
      id: nextId,
      description: data.description,
      amount: data.amount,
      type: data.type,
      category: data.category,
      date: data.date ?? new Date().toISOString(), 
    };

    this.transactions.push(transaction);
    return transaction;
  }
}
