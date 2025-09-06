import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import {
  getAllTransactions,
  getTransaction,
  createTransaction,
} from "../../src/controllers/transactionsController";

// Monta app de teste
const app = express();
app.use(bodyParser.json());
app.get("/transactions", getAllTransactions);
app.get("/transactions/:id", getTransaction);
app.post("/transactions", createTransaction);

describe("Transactions API - Integração com mocks", () => {
  it("deve retornar todas as transações mockadas inicialmente", async () => {
    const res = await request(app).get("/transactions");
    expect(res.status).toBe(200);

    expect(res.body.length).toBeGreaterThanOrEqual(10); 
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("description");
    expect(res.body[0]).toHaveProperty("amount");
  });

  it("deve criar uma nova transação com ID sequencial", async () => {
    const newTransaction = {
      description: "Venda Teste",
      amount: 1000,
      type: "income" as const,
      category: "Renda Extra",
    };

    const res = await request(app).post("/transactions").send(newTransaction);
    expect(res.status).toBe(201);
    expect(res.body.id).toBe("11"); 
    expect(res.body).toMatchObject(newTransaction);
  });

  it("deve retornar a transação pelo ID", async () => {
    const res = await request(app).get("/transactions/11");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", "11");
    expect(res.body.description).toBe("Venda Teste");
  });

  it("deve filtrar transações por tipo e categoria", async () => {
    const res = await request(app)
      .get("/transactions")
      .query({ type: "income", category: "Renda Extra" });

    expect(res.status).toBe(200);
    expect(res.body.every((t: any) => t.type === "income")).toBe(true);
    expect(res.body.every((t: any) => t.category === "Renda Extra")).toBe(true);
  });

  it("deve filtrar transações por faixa de valor", async () => {
    const res = await request(app)
      .get("/transactions")
      .query({ minAmount: 100, maxAmount: 500 });

    expect(res.status).toBe(200);
    expect(res.body.every((t: any) => t.amount >= 100 && t.amount <= 500)).toBe(true);
  });
});
