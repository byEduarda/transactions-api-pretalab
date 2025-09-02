export type TransactionType = "income" | "expense";

export interface Transaction {
  date: Date;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
}
