import request from "supertest";
import app from "../../src/app";
import { connect, closeDatabase } from "./setup";

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await closeDatabase();
});

describe("Integração da Rota de Sincronização", () => {
  it("deve sincronizar produtos e retornar sucesso", async () => {
    const res = await request(app).post("/api/sync-products");
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/sucesso/i);
  });
});