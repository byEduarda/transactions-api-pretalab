import { TransactionModel, ITransaction } from "../database/mongooseTransactions";
import { TransactionInput, TransactionFilters, transactions as initialTransactions, transactions } from "../models/Transactions";

export class TransactionService {
  static async seedInitialTransactions() {
    for (const mock of initialTransactions) {
      const exists = await TransactionModel.findOne({ id: mock.id });
      if (!exists) {
        await TransactionModel.create({
          ...mock,
          date: mock.date ?? new Date().toISOString(),
        });
      }
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

    return await TransactionModel.find(query)
    .sort({})
    .then(transactions =>
      transactions
        .sort((a, b) => parseInt(a.id) - parseInt(b.id)) 
        .map(t => ({
          id: t.id,
          date: t.date,
          description: t.description,
          amount: t.amount,
          type: t.type,
          category: t.category,
        }))
      );    
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
      date: data.date ?? new Date().toISOString(),
    });

    await transaction.save();
    return transaction;
  }
}
