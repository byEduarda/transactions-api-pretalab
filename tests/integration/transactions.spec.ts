import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../src/app";
import { TransactionModel } from "../../src/database/mongooseTransactions";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await TransactionModel.deleteMany({});
});

describe("Integração completa da API de Transações", () => {

  it("GET /transactions - deve retornar lista vazia inicialmente", async () => {
    const res = await request(app).get("/transactions");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("POST /transactions - deve criar uma nova transação", async () => {
    const data = {
      description: "Conta de Internet",
      amount: 99.9,
      type: "expense",
      category: "Contas",
      date: "2024-07-20T11:00:00.000Z"
    };

    const res = await request(app)
      .post("/transactions")
      .send(data);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: "1",
      description: "Conta de Internet",
      amount: 99.9,
      type: "expense",
      category: "Contas",
      date: data.date
    });
  });

  it("GET /transactions/:id - deve retornar a transação criada", async () => {
    const transaction = await TransactionModel.create({
      id: "1",
      description: "Salário",
      amount: 5000,
      type: "income",
      category: "Salário",
      date: new Date("2024-07-15T10:00:00.000Z")
    });

    const res = await request(app).get(`/transactions/${transaction.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: "1",
      description: "Salário",
      amount: 5000,
      type: "income",
      category: "Salário",
      date: "2024-07-15T10:00:00.000Z"
    });
  });

  it("GET /transactions/:id - deve retornar 404 se não existir", async () => {
    const res = await request(app).get("/transactions/999");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: "Transação não encontrada." });
  });

  it("GET /transactions - deve filtrar transações por tipo e categoria", async () => {
    await TransactionModel.create([
      {
        id: "1",
        description: "Aluguel",
        amount: 1200,
        type: "expense",
        category: "Moradia",
        date: new Date()
      },
      {
        id: "2",
        description: "Salário",
        amount: 5000,
        type: "income",
        category: "Salário",
        date: new Date()
      }
    ]);

    const res = await request(app)
      .get("/transactions")
      .query({ type: "expense", category: "Moradia" });

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toMatchObject({
      type: "expense",
      category: "Moradia"
    });
  });

});
