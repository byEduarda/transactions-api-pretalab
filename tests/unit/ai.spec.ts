import request from "supertest";
import { connect, closeDatabase, clearDatabase } from "../integration/setup";
import app from "../../src/app";
import * as aiService from "../../src/services/aiService";

jest.mock("../../src/services/aiService");

describe("AI Unit", () => {
  beforeAll(async () => {
    await connect();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it("deve retornar 200 com a resposta do assistente financeiro", async () => {
    const mockReply = "Seu maior gasto foi R$ 500,00";
    (aiService.financialAssistant as jest.Mock).mockResolvedValue(mockReply);

    const res = await request(app)
      .post("/chat")
      .send({ message: "Qual foi meu maior gasto?" });

    expect(res.status).toBe(200);
    expect(res.body.reply).toBe(mockReply);
    expect(aiService.financialAssistant).toHaveBeenCalledWith(
      "Qual foi meu maior gasto?",
      expect.any(Array) 
    );
  });

  it("deve retornar 500 se o assistente financeiro falhar", async () => {
    (aiService.financialAssistant as jest.Mock).mockRejectedValue(new Error("Erro no serviço"));

    const res = await request(app)
      .post("/chat")
      .send({ message: "Qual foi meu maior gasto?" });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Ocorreu um erro ao processar sua solicitação.");
  });
});
