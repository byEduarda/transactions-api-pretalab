import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import { getAllTransactions, getTransaction, createTransaction } from "../../src/controllers/transactionsController";
import { connect, closeDatabase, clearDatabase } from "../integration/setup";

const app = express();
app.use(bodyParser.json());
app.get("/transactions", getAllTransactions);
app.get("/transactions/:id", getTransaction);
app.post("/transactions", createTransaction);

describe("Transactions API - Integração com mocks", () => {
  beforeAll(async () => {
    await connect(); 
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearDatabase(); 
  });

  it("deve criar uma nova transação com ID sequencial e usar data atual se não fornecida", async () => {
    const newTransaction = {
      description: "Venda Teste",
      amount: 1000,
      type: "income" as const,
      category: "Renda Extra",
    };

    const res = await request(app).post("/transactions").send(newTransaction);

    expect(res.status).toBe(201);
    expect(res.body.id).toBe("1");
    expect(res.body).toMatchObject(newTransaction);
    expect(new Date(res.body.date).getTime()).toBeLessThanOrEqual(Date.now()); 
  });

  it("deve retornar a transação pelo ID", async () => {
    const newTransaction = { description: "Venda Teste", amount: 1000, type: "income", category: "Renda Extra" };
    const postRes = await request(app).post("/transactions").send(newTransaction);

    const res = await request(app).get(`/transactions/${postRes.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(newTransaction);
  });
});
