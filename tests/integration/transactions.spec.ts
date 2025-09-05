import request from "supertest";
import mongoose from "mongoose";
import app from "../../src/app";
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

describe("Transactions API", () => {
  it("deve criar uma nova transação", async () => {
    const res = await request(app)
      .post("/transactions")
      .send({
        description: "Salário de Setembro",
        amount: 5000,
        type: "income",
        category: "Salário",
        date: new Date().toISOString(),
      });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: "1",
      description: "Salário de Setembro",
      amount: 5000,
      type: "income",
      category: "Salário",
    });
  });

  it("deve listar todas as transações", async () => {
    await TransactionModel.create({
      id: "1",
      description: "Aluguel",
      amount: 1500,
      type: "expense",
      category: "Moradia",
      date: new Date(),
    });

    const res = await request(app).get("/transactions");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toMatchObject({
      id: "1",
      description: "Aluguel",
      amount: 1500,
      type: "expense",
      category: "Moradia",
    });
  });

  it("deve buscar uma transação pelo id", async () => {
    await TransactionModel.create({
      id: "1",
      description: "Aluguel",
      amount: 1500,
      type: "expense",
      category: "Moradia",
      date: new Date(),
    });

    const res = await request(app).get("/transactions/1");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: "1",
      description: "Aluguel",
      amount: 1500,
      type: "expense",
      category: "Moradia",
    });
  });

  it("retorna 404 ao buscar transação inexistente", async () => {
    const res = await request(app).get("/transactions/999");
    expect(res.status).toBe(404);
  });

  it("retorna 400 ao criar transação inválida", async () => {
    const res = await request(app).post("/transactions").send({
      description: "",
      amount: "abc",
    });
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({ message: "Dados da transação inválidos." });
  });
});
