
const mockPurchases = [
  { id: "1", date: "2024-07-01T10:00:00Z", total: 100, items: [] },
  { id: "2", date: "2024-07-02T12:00:00Z", total: 200, items: [] },
];

jest.mock("../../src/services/purchaseService", () => {
  return {
    PurchaseService: jest.fn().mockImplementation(() => ({
      getAll: jest.fn().mockReturnValue(mockPurchases),
      getById: jest.fn((id: string) =>
        mockPurchases.find((p) => p.id === id)
      ),
      create: jest.fn((purchase: any) => ({
        id: "3",
        ...purchase,
      })),
    })),
  };
});

import request from "supertest";
import app from "../../src/app";

describe("API de Compras", () => {
  it("deve retornar todas as compras", async () => {
    const response = await request(app).get("/purchases");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(mockPurchases);
  });

  it("deve retornar uma compra pelo ID", async () => {
    const response = await request(app).get("/purchases/1");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(mockPurchases[0]);
  });
});
