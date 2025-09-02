import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  if (process.env.NODE_ENV === "test") {
    console.log("Test mode: skipping default MongoDB connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("MongoDB conectado com sucesso!");
  } catch (err) {
    console.error("Erro ao conectar no MongoDB:", err);
    process.exit(1);
  }
};
