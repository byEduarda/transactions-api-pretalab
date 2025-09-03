import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../src/app";

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

describe("Integração completa da API", () => {
  it("GET /api/products - deve retornar produtos", async () => {
    const res = await request(app).get("/products");
    expect(res.status).toBe(200);
  });

  it("GET /api/transactions - deve retornar transações (vazio)", async () => {
    const res = await request(app).get("/transactions");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("GET /api/purchases - deve retornar compras (vazio)", async () => {
    const res = await request(app).get("/purchases");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});
