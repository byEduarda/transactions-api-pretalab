import { TransactionModel, Transaction } from "../database/mongooseTransactions";

interface TransactionFilter {
  type?: "income" | "expense";
  category?: string;
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
}

export class TransactionService {
  async getAll(filter?: TransactionFilter) {
    const query: any = {};

    if (filter) {
      if (filter.type) query.type = filter.type;
      if (filter.category) query.category = filter.category;
      if (filter.startDate || filter.endDate) {
        query.date = {};
        if (filter.startDate) query.date.$gte = filter.startDate;
        if (filter.endDate) query.date.$lte = filter.endDate;
      }
      if (filter.minAmount || filter.maxAmount) {
        query.amount = {};
        if (filter.minAmount) query.amount.$gte = filter.minAmount;
        if (filter.maxAmount) query.amount.$lte = filter.maxAmount;
      }
    }

    return TransactionModel.find(query).exec();
  }

  async getById(id: string) {
    return TransactionModel.findOne({ id }).exec();
  }

  async create(transaction: Omit<Transaction, "id">) {
    const count = await TransactionModel.countDocuments().exec();
    const newTransaction = new TransactionModel({
      ...transaction,
      id: String(count + 1),
    });

    return newTransaction.save();
  }
}
