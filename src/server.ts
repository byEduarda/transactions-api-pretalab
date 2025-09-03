import app from "./app";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./database/mongoConnect";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});