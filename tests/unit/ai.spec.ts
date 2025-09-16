import request from "supertest";
import app from "../../src/app";
import * as aiService from "../../src/services/aiService";
import { TransactionModel } from "../../src/database/mongooseTransactions";

jest.mock("../../src/services/aiService");
jest.mock("../../src/database/mongooseTransactions");

describe("AI Unit", () => {
  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    (console.log as jest.Mock).mockRestore();
    (console.error as jest.Mock).mockRestore();
  });

  it(
    "deve retornar 200 com a resposta do assistente financeiro",
    async () => {
      (TransactionModel.find as jest.Mock).mockReturnValue({
        sort: () => ({ exec: () => Promise.resolve([]) }),
      });

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
    },
    10000
  );

  it(
    "deve retornar 500 se o assistente financeiro falhar",
    async () => {
      (TransactionModel.find as jest.Mock).mockReturnValue({
        sort: () => ({ exec: () => Promise.resolve([]) }),
      });

      (aiService.financialAssistant as jest.Mock).mockRejectedValue(new Error("Erro no serviço"));

      const res = await request(app)
        .post("/chat")
        .send({ message: "Qual foi meu maior gasto?" });

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Ocorreu um erro ao processar sua solicitação.");
    },
    10000 
  );
});