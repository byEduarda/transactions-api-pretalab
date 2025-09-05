import request from "supertest";
import app from "../../src/app";
import { connect, closeDatabase } from "./setup";

beforeAll(async () => await connect());
afterAll(async () => await closeDatabase());

describe("Purchases API", () => {
  let purchaseId: string;

  it("deve processar uma compra", async () => {
    const res = await request(app)
      .post("/checkout")
      .send({
        cart: [
          { productId: "1", name: "Notebook Gamer Pro", price: 7500, quantity: 1 },
          { productId: "2", name: "Mouse Gamer", price: 2500, quantity: 1 },
        ]
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("total", 10000); 
    purchaseId = res.body.id;
  });

  it("deve listar todas as compras", async () => {
    const res = await request(app).get("/purchases");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("total");
  });

  it("deve buscar uma compra pelo ID", async () => {
    const res = await request(app).get(`/purchases/${purchaseId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", purchaseId);
    expect(res.body).toHaveProperty("total");
  });
});
