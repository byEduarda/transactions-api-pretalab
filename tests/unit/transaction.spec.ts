import { TransactionModel } from "../../src/database/mongooseTransactions";
import * as transactionService from "../../src/services/transactionService";
import { connect, closeDatabase, clearDatabase } from "../integration/setup";

describe("Transaction Service - Unit Tests", () => {
  beforeAll(async () => {
    await connect();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it("deve criar uma nova transação com ID sequencial", async () => {
    const data = {
      description: "Conta de Luz",
      amount: 150,
      type: "expense" as const,
      category: "Contas",
      date: new Date(),
    };

    const transaction = await transactionService.create(data);

    expect(transaction).toMatchObject({
      id: "1",
      description: "Conta de Luz",
      amount: 150,
      type: "expense",
      category: "Contas",
    });
  });

  it("deve retornar uma transação pelo ID", async () => {
  const created = await transactionService.create({
    description: "Salário",
    amount: 5000,
    type: "income",
    category: "Salário",
    date: new Date(),
  });

  const found = await transactionService.getTransactionById(created.id); 
  expect(found).toMatchObject({
    id: created.id,
    description: "Salário",
    amount: 5000,
    type: "income",
    category: "Salário",
  });
});

  it("deve filtrar transações por tipo e categoria", async () => {
    await transactionService.create({
      description: "Aluguel",
      amount: 1200,
      type: "expense",
      category: "Moradia",
      date: new Date(),
    });

    const results = await transactionService.getAllTransactions();

    const filtered = results.filter(t => t.type === "expense" && t.category === "Moradia");

    expect(filtered[0]).toMatchObject({
      type: "expense",
      category: "Moradia",
    });
  });
});
