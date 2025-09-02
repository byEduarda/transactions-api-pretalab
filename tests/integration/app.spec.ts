import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../src/app";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Products API", () => {
  it("GET /api/products should return all products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("Transactions API", () => {
  it("POST /api/transactions should create transaction", async () => {
    const res = await request(app).post("/api/transactions").send({
      description: "Teste",
      amount: 100,
      type: "income",
      category: "Salário",
      date: new Date().toISOString()
    });
    expect(res.status).toBe(201);
    expect(res.body.description).toBe("Teste");
  });

  it("GET /api/transactions should return transactions", async () => {
    const res = await request(app).get("/api/transactions");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

describe("Purchases API", () => {
  it("POST /api/purchases/checkout should create a purchase", async () => {
    const res = await request(app).post("/api/purchases/checkout").send({
      cart: [{ productId: 1, quantity: 1 }],
      total: 100
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Compra processada com sucesso!");
  });

  it("GET /api/purchases should return purchases", async () => {
    const res = await request(app).get("/api/purchases");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
