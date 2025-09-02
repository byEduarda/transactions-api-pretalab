import { TransactionRepository } from "../repositories/transactionRepository";
import { Transaction } from "../domain/Transaction";

export class TransactionService {
  constructor(private repo = new TransactionRepository()) {}

  list(filters?: any) {
    return this.repo.findAll(filters);
  }

  getById(id: string) {
    return this.repo.findById(id);
  }

  create(data: Transaction) {
    return this.repo.create({
      date: data.date,
      description: data.description,
      amount: data.amount,
      type: data.type,
      category: data.category
    });
  }
}
