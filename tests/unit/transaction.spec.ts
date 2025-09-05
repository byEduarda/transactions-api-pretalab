import mongoose from "mongoose";
import { TransactionService } from "../../src/services/transactionService";
import { TransactionModel } from "../../src/database/mongooseTransactions";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/testdb");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await TransactionModel.deleteMany({});
});

describe("Transactions Unit Tests", () => {
  let service: TransactionService;

  beforeEach(() => {
    service = new TransactionService();
  });

  it("deve criar uma transação e gerar id sequencial", async () => {
    const transaction = await service.create({
      description: "Salário",
      amount: 5000,
      type: "income",
      category: "Salário",
      date: new Date(),
    });

    expect(transaction).toMatchObject({
      id: "1",
      description: "Salário",
      amount: 5000,
      type: "income",
      category: "Salário",
    });
  });

  it("deve listar todas as transações", async () => {
    await service.create({
      description: "Salário",
      amount: 5000,
      type: "income",
      category: "Salário",
      date: new Date(),
    });

    const transactions = await service.getAll();
    expect(transactions.length).toBe(1);
    expect(transactions[0]).toMatchObject({
      id: "1",
      description: "Salário",
      amount: 5000,
      type: "income",
      category: "Salário",
    });
  });

  it("deve buscar uma transação pelo id", async () => {
    await service.create({
      description: "Aluguel",
      amount: 1500,
      type: "expense",
      category: "Moradia",
      date: new Date(),
    });

    const found = await service.getById("1");
    expect(found).toMatchObject({
      id: "1",
      description: "Aluguel",
      amount: 1500,
      type: "expense",
      category: "Moradia",
    });
  });
});
