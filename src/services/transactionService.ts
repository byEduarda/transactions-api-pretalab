import { TransactionModel, ITransaction } from "../database/mongooseTransactions";
import { TransactionInput, TransactionFilters, transactions as initialTransactions } from "../models/Transactions";

export class TransactionService {
  static async seedInitialTransactions() {
    const count = await TransactionModel.countDocuments();
    if (count === 0) {
      await TransactionModel.insertMany(initialTransactions);
    }
  }

  async getAllTransactions(filters?: TransactionFilters): Promise<ITransaction[]> {
    const query: any = {};

    if (filters?.type) query.type = filters.type;
    if (filters?.category) query.category = filters.category;

    if (filters?.startDate || filters?.endDate) {
      query.date = {};
      if (filters.startDate) query.date.$gte = new Date(filters.startDate);
      if (filters.endDate) query.date.$lte = new Date(filters.endDate);
    }

    if (filters?.minAmount !== undefined || filters?.maxAmount !== undefined) {
      query.amount = {};
      if (filters.minAmount !== undefined) query.amount.$gte = filters.minAmount;
      if (filters.maxAmount !== undefined) query.amount.$lte = filters.maxAmount;
    }

    return await TransactionModel.find(query).sort({ date: 1 });
  }

  async getTransactionById(id: string): Promise<ITransaction | null> {
    return await TransactionModel.findOne({ id });
  }
  async create(data: TransactionInput): Promise<ITransaction> {
    const last = await TransactionModel.findOne().sort({ id: -1 });
    const nextId = last ? (parseInt(last.id) + 1).toString() : "1";

    const transaction = new TransactionModel({
      ...data,
      id: nextId,
    });

    await transaction.save();
    return transaction;
  }
}
