import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";

import Product from "./models/Products.js";
import User from "./models/Users.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cors from 'cors'; 

dotenv.config()

app.use(express.json());

app.use(cors())

// iniciando conexão com o banco de dados (terminar)
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Banco de dados conectado com sucesso!")
    } catch (error) {
        console.log(error, "Erro ao conectar ao banco.")
    }
}

connectDB();
app.use("/", productRoutes);
app.use("/", userRoutes);
app.use("/", orderRoutes);

app.get("/", (req, res) => {
    res.status(200).json({ "message": "API rodando com sucesso!"})
})

const port = 4000;
app.listen(port, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log(`API rodando na porta http://localhost:${port}`)
    }
})