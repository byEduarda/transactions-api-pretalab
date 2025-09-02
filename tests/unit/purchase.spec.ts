import request from "supertest";
import app from "../../src/app";
import { PurchaseService } from "../../src/services/purchaseService";

jest.mock("../../src/services/purchaseService");

const service = new PurchaseService() as jest.Mocked<PurchaseService>;

describe("Testes de Compras", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve listar todas as compras (unit)", async () => {
    service.getPurchases.mockResolvedValue([
      {
        id: "1",
        date: new Date(),
        total: 1000,
        items: [],
      } as any,
    ]);

    const res = await request(app).get("/api/purchases");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].total).toBe(1000);
  });

  it("deve buscar uma compra pelo ID (unit)", async () => {
    service.getPurchaseById.mockResolvedValue({
      id: "1",
      date: new Date(),
      total: 500,
      items: [],
    } as any);

    const res = await request(app).get("/api/purchases/1");

    expect(res.status).toBe(200);
    expect(res.body.total).toBe(500);
  });

  it("deve retornar 404 se a compra não existir (unit)", async () => {
    service.getPurchaseById.mockResolvedValue(null as any);

    const res = await request(app).get("/api/purchases/99");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Compra não encontrada.");
  });

  it("deve processar o checkout com sucesso (integration)", async () => {
    service.createPurchases.mockResolvedValue({
      id: "1",
      date: new Date(),
      total: 2000,
      items: [
        { productId: "123", name: "Notebook", price: 2000, quantity: 1 },
      ],
    } as any);

    const res = await request(app).post("/api/purchases/checkout").send({
      cart: [{ productId: "123", quantity: 1, name: "Notebook", price: 2000 }],
      total: 2000,
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Compra processada com sucesso!");
  });

  it("deve falhar se o total exceder 20000 (integration)", async () => {
    const res = await request(app).post("/api/purchases/checkout").send({
      cart: [{ productId: "123", quantity: 1, name: "Notebook", price: 25000 }],
      total: 25000,
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      "O valor total da compra excede o limite de R$20.000."
    );
  });
});
