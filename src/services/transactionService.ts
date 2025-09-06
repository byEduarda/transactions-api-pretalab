import { Transaction, transactions as initialTransactions } from "../models/Transactions";

export interface TransactionInput {
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date?: Date;
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

  getAll(filters?: TransactionFilters): Transaction[] {
    let result = [...this.transactions];

    if (filters?.type) result = result.filter(t => t.type === filters.type);
    if (filters?.category) result = result.filter(t => t.category === filters.category);
    if (filters?.startDate) result = result.filter(t => new Date(t.date) >= new Date(filters.startDate!));
    if (filters?.endDate) result = result.filter(t => new Date(t.date) <= new Date(filters.endDate!));
    if (filters?.minAmount !== undefined) result = result.filter(t => t.amount >= filters.minAmount!);
    if (filters?.maxAmount !== undefined) result = result.filter(t => t.amount <= filters.maxAmount!);

    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getById(id: string): Transaction | undefined {
    return this.transactions.find(t => t.id === id);
  }

  create(data: TransactionInput): Transaction {
    const maxId = this.transactions.reduce((max, t) => Math.max(max, parseInt(t.id)), 0);
    const nextId = (maxId + 1).toString();

    const newTransaction: Transaction = {
      id: nextId,
      ...data,
      date: data.date ? data.date.toISOString() : new Date().toISOString(),
    };

    this.transactions.push(newTransaction);
    return newTransaction;
  }
}
