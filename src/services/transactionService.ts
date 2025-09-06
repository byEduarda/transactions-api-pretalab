import { TransactionModel, ITransaction } from "../database/mongooseTransactions";

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

export const getAllTransactions = async (
  filters?: TransactionFilters
): Promise<ITransaction[]> => {
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

  return await TransactionModel.find(query).sort({ date: -1 });
};

export const getTransactionById = async (id: string): Promise<ITransaction | null> => {
  return await TransactionModel.findOne({ id });
};

export const create = async (data: TransactionInput): Promise<ITransaction> => {
  const lastTransaction = await TransactionModel.findOne().sort({ id: -1 });

  const nextId = lastTransaction ? (parseInt(lastTransaction.id) + 1).toString() : "1";

  const transaction = new TransactionModel({
    id: nextId,
    ...data,
    date: data.date || new Date(),
  });

  return await transaction.save();
};
