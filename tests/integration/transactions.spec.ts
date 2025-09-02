import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../src/app";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Transactions API", () => {
  it("deve retornar lista de transações vazia inicialmente", async () => {
    const res = await request(app).get("/api/transactions");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("deve criar uma transação", async () => {
    const res = await request(app).post("/api/transactions").send({
      description: "Salário",
      amount: 5000,
      type: "income",
      category: "Salário",
      date: new Date().toISOString(),
    });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      description: "Salário",
      amount: 5000,
      type: "income",
      category: "Salário",
    });
  });

  it("deve buscar uma transação pelo ID", async () => {
    const createRes = await request(app).post("/api/transactions").send({
      description: "Aluguel",
      amount: 1500,
      type: "expense",
      category: "Moradia",
      date: new Date().toISOString(),
    });

    const id = createRes.body.id;
    const res = await request(app).get(`/api/transactions/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id,
      description: "Aluguel",
      amount: 1500,
      type: "expense",
      category: "Moradia",
    });
  });
});
