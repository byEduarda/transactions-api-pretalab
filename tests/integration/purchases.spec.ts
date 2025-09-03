import request from "supertest";
import app from "../../src/app";
import { connect, closeDatabase } from "./setup";

beforeAll(async () => await connect());
afterAll(async () => await closeDatabase());

describe("Purchases API", () => {
  let purchaseId: string;

  it("deve processar uma compra", async () => {
    const res = await request(app).post("/purchases").send({
      cart: [
        { productId: "1", quantity: 1 },
        { productId: "2", quantity: 1 },
      ],
      total: 7850,
    });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ message: "Compra processada com sucesso!" });
  });

  it("deve listar todas as compras", async () => {
    const res = await request(app).get("/purchases");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    purchaseId = res.body[0].id;
    expect(res.body[0]).toMatchObject({ total: 7850 });
  });

  it("deve buscar uma compra pelo ID", async () => {
    const res = await request(app).get(`/purchases/${purchaseId}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ total: 7850 });
  });
});
