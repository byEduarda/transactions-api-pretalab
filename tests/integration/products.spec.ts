import request from "supertest";
import app from "../../src/app";
import { connect, closeDatabase } from "./setup";

beforeAll(async () => await connect());
afterAll(async () => await closeDatabase());

describe("Products API", () => {
  it("deve retornar todos os produtos", async () => {
    const res = await request(app).get("/products");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toMatchObject({
      id: "1",
      name: "Notebook Gamer Pro",
      price: 7500,
    });
  });

  it("deve buscar um produto pelo ID", async () => {
    const res = await request(app).get("/products/1");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: "1",
      name: "Notebook Gamer Pro",
      price: 7500,
    });
  });
});
