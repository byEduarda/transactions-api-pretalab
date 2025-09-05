import { PurchaseService } from "../../src/services/purchaseService";
import { connect, closeDatabase, clearDatabase } from "../integration/setup";

describe("Checkout Unit Tests", () => {
  let service: PurchaseService;

  beforeAll(async () => await connect());
  afterAll(async () => await closeDatabase());
  beforeEach(async () => await clearDatabase());

  beforeEach(() => {
    service = new PurchaseService();
  });

  it("deve criar uma compra com itens", async () => {
    const purchase = await service.create({
      items: [
        { productId: "1", name: "Notebook Gamer Pro", price: 7500, quantity: 1 },
        { productId: "2", name: "Mouse Gamer", price: 2500, quantity: 1 },
      ],
      total: 10000,
    });

    expect(purchase).toMatchObject({
      total: 10000,
      items: [
        { productId: "1", name: "Notebook Gamer Pro", price: 7500, quantity: 1 },
        { productId: "2", name: "Mouse Gamer", price: 2500, quantity: 1 },
      ],
    });

    expect(purchase).toHaveProperty("id");
    expect(purchase).toHaveProperty("date");
  });

  it("deve lançar erro se total > 20000", async () => {
    await expect(
      service.create({
        items: [{ productId: "1", name: "Notebook Pro", price: 25000, quantity: 1 }],
        total: 25000,
      })
    ).rejects.toThrow("O valor total da compra excede o limite de R$20.000.");
  });
});
