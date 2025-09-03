import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import ProductModel from "../../src/database/mongooseProduct";
import { syncProducts, getExternalProducts } from "../../src/externalAPI/finshopping";

import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Finshopping - Sincronização de Produtos", () => {
  it("deve buscar produtos da API externa", async () => {
    const mockData = [
      { name: "Produto A", price: 100 },
      { name: "Produto B", price: 200 },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await getExternalProducts();

    expect(mockedAxios.get).toHaveBeenCalledWith("https://finshopping.vercel.app/api/products");
    expect(result).toEqual(mockData);
  });

  it("deve salvar os produtos no MongoDB ao sincronizar", async () => {
    const mockData = [
      { name: "Produto A", price: 100 },
      { name: "Produto B", price: 200 },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    await syncProducts();

    const productsInDB = await ProductModel.find({});
    expect(productsInDB).toHaveLength(2);
    expect(productsInDB[0].name).toBe("Produto A");
    expect(productsInDB[1].price).toBe(200);
  });
});
