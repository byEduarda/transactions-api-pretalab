import request from "supertest";
import express from "express";
import { connect, closeDatabase, clearDatabase } from "../integration/setup";
import { TransactionModel } from "../../src/database/mongooseTransactions";

jest.mock("../../src/services/aiService", () => ({
  financialAssistant: jest.fn().mockResolvedValue("Esta é uma resposta simulada...")
}));

import { chat } from "../../src/controllers/aiController";
import { financialAssistant } from "../../src/services/aiService";

const app = express();
app.use(express.json());
app.post("/chat", chat);

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await closeDatabase();
});

beforeEach(async () => {
  await clearDatabase();
});

describe("Chat Integration", () => {
  it("responde com reply simulada mesmo com transações no Mongo", async () => {
    await TransactionModel.create({
      id: "1",
      date: new Date(),
      description: "Compra teste",
      amount: 100,
      type: "expense",
      category: "Alimentação"
    });

    const res = await request(app)
      .post("/chat")
      .send({ message: "Qual foi meu maior gasto?" });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      reply: "Esta é uma resposta simulada..."
    });

    expect(financialAssistant).toHaveBeenCalled();
  });

  it("retorna 400 se message não enviado", async () => {
    const res = await request(app).post("/chat").send({});
    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      message: "A chave 'message' é obrigatória no corpo da requisição."
    });
  });
});
