import { Transaction, transactions as initialTransactions } from "../models/Transactions";

export class TransactionRepository {
  private transactions: Transaction[] = [...initialTransactions];

  getAll(): Transaction[] {
    return [...this.transactions].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; 
    });
  }

  getById(id: string): Transaction | undefined {
    return this.transactions.find((t) => t.id === id);
  }

  create(transaction: Omit<Transaction, "id">): Transaction {
    const lastId = this.transactions.length
      ? Math.max(...this.transactions.map((t) => parseInt(t.id)))
      : 0;
    const nextId = (lastId + 1).toString();

    const newTransaction: Transaction = {
      id: nextId,
      ...transaction,
      date: transaction.date ?? new Date().toISOString(),
    };

    this.transactions.push(newTransaction);
    return newTransaction;
  }
}
