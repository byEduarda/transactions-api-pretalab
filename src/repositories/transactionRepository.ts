import { Transaction, transactions as initialTransactions } from "../models/Transactions";
import { v4 as uuid } from "uuid";

export class TransactionRepository {
  private transactions: Transaction[] = [...initialTransactions];


  getAll(): Transaction[] {
    return [...this.transactions].sort((a, b) => {
      const dateA = new Date(a.date ?? 0).getTime();
      const dateB = new Date(b.date ?? 0).getTime();
      return dateB - dateA;
    });
  }

  getById(id: string): Transaction | undefined {
    return this.transactions.find((transaction) => transaction.id === id);
  }

  create(transaction: Omit<Transaction, "id">): Transaction {
    const newTransaction: Transaction = {
      id: uuid(),
      ...transaction,
      date: transaction.date ?? new Date().toISOString(), 
    };

    this.transactions.push(newTransaction);
    return newTransaction;
  }
}
