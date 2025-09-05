import { Transaction } from "../models/Transactions";
import { v4 as uuid } from "uuid";
import { transactions as initialTransactions } from "../models/Transactions";

export class TransactionRepository {
  private transactions: Transaction[] = [...initialTransactions];

  getAll(): Transaction[] {
    return [...this.transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  getById(id: string): Transaction | undefined {
    return this.transactions.find((t) => t.id === id);
  }

  create(transaction: Omit<Transaction, "id">): Transaction {
    const newTransaction: Transaction = { id: uuid(), ...transaction };
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}
