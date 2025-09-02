import { TransactionRepository } from "../repositories/transactionRepository";
import { Transaction, TransactionType } from "../domain/Transactions";

interface TransactionFilter {
  type?: TransactionType;
  category?: string;
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
}

export class TransactionService {
  private repository = new TransactionRepository();

  getAll(filter?: TransactionFilter): Transaction[] {
    let transactions = this.repository.getAll();

    if (!filter) return transactions;

    return transactions.filter((t) => {
      if (filter.type && t.type !== filter.type) return false;
      if (filter.category && t.category !== filter.category) return false;
      if (filter.startDate && t.date < filter.startDate) return false;
      if (filter.endDate && t.date > filter.endDate) return false;
      if (filter.minAmount && t.amount < filter.minAmount) return false;
      if (filter.maxAmount && t.amount > filter.maxAmount) return false;
      return true;
    });
  }

  getById(id: string): Transaction | undefined {
    return this.repository.getById(id);
  }

  create(transaction: Omit<Transaction, "id">): Transaction {
    return this.repository.create(transaction);
  }
}
