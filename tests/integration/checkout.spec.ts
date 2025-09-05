import request from "supertest";
import app from "../../src/app";
import { connect, closeDatabase } from "./setup";

beforeAll(async () => await connect());
afterAll(async () => await closeDatabase());

describe("Checkout API", () => {
  it("deve processar uma compra com sucesso", async () => {
    const res = await request(app)
      .post("/checkout")
      .send({
        cart: [
          { productId: "1", name: "Notebook Gamer Pro", price: 7500, quantity: 1 },
          { productId: "2", name: "Mouse Gamer", price: 2500, quantity: 1 }
        ]
      });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      total: 10000,
      items: [
        { productId: "1", name: "Notebook Gamer Pro", price: 7500, quantity: 1 },
        { productId: "2", name: "Mouse Gamer", price: 2500, quantity: 1 }
      ]
    });
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("date");
  });

  it("deve retornar erro se total > 20000", async () => {
    const res = await request(app)
      .post("/checkout")
      .send({
        cart: [
          { productId: "1", name: "Notebook Gamer Pro", price: 15000, quantity: 2 }
        ]
      });

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      message: "O valor total da compra excede o limite de R$20.000."
    });
  });

  it("deve retornar erro se carrinho estiver vazio", async () => {
    const res = await request(app)
      .post("/checkout")
      .send({ cart: [] });

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      message: "Dados da compra inválidos."
    });
  });
});
