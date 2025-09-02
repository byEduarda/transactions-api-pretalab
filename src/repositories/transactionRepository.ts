import { Transaction } from "../domain/Transactions";
import { v4 as uuid } from "uuid";

export class TransactionRepository {
  private transactions: Transaction[] = [];

  getAll(): Transaction[] {
    return [...this.transactions].sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  getById(id: string): Transaction | undefined {
    return this.transactions.find(t => t.id === id);
  }

  create(transaction: Omit<Transaction, "id">): Transaction {
    const newTransaction: Transaction = { id: uuid(), ...transaction };
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}
