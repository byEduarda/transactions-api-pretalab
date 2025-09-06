import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { TransactionModel, ITransaction } from "../database/mongooseTransactions"; 

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("A variável de ambiente GEMINI_API_KEY não está definida.");
}

const geminiAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const financialAssistant = async (
  prompt: string,
  transactions?: ITransaction[]
): Promise<string> => {
  if (!prompt) throw new Error("Mensagem é obrigatória.");

  try {
    const txs: ITransaction[] =
      transactions ?? (await TransactionModel.find().sort({ date: -1 }).exec());

    if (!txs.length) {
      return "Não existem transações salvas para análise.";
    }

    const systemInstruction = `
      Você é um assistente financeiro e vai analisar os dados informados,
      conforme a solicitação do usuário.
      Os dados informados estão dentro de um array e possuem: valor, categoria,
      data, descrição e tipo (entrada ou saída).
      Sempre responda de forma clara e objetiva.
    `;

    const finalPrompt = `
    ${systemInstruction}
    Transações disponíveis: ${JSON.stringify(txs, null, 2)}
    Pergunta do usuário: ${prompt} `;

    const model = geminiAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction,
    });

    const result = await model.generateContent(finalPrompt);
    return result.response.text();
  } catch (error) {
    console.error("Erro no financialAssistant:", error);
    throw new Error("Erro interno do servidor ao se comunicar com a IA.");
  }
};
