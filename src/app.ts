import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./database/mongoConnect";

import productsRoutes from "./routes/productsRoutes";
import transactionsRoutes from "./routes/transactionsRoutes";
import purchasesRoutes from "./routes/purchasesRoutes";

const app = express();
app.use(express.json());

app.use(bodyParser.json());

app.use("/api/purchases", purchasesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/transactions", transactionsRoutes);


connectDB();

export default app;
