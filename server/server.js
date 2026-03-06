// const importName = require("libraryName")
import dotenv  from "dotenv"
// Além de importar o dotenv, é preciso chamar essa função pra deixar configurado
dotenv.config();

import express from "express";
// Configura uma variável para chamar o express
const app = express();
import cors from "cors";
const corsOptions = {
    origin: "http://localhost:5173", // String direta do servidor de Front
    methods: ["GET", "POST", "PUT", "DELETE"], // Define os métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"] // Garante que o Token passe no header

};

// Json Web Token
import jwt from "jsonwebtoken";
// MongoDB
import mongoose from "mongoose";
import workTime from './bank.js';

// Processa dados do .env
const { USER, SENHA, ACESS_TOKEN_KEY, MONGO_URI } = process.env;

// Conecta ao banco de dados
const connectDB = async () => {
    
    try{
        // Link do MongoDB
        await mongoose.connect(MONGO_URI)
        console.log("conectado ao mongo")}
    catch(error){
        console.log("deu erro", error)}
}

connectDB();

// Express vai utilizar o cors, com as opções pré-definidas
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Criação de um endpoint
app.post("/api/login", (req, res) => {
    const { email, senha } = req.body;

    if (email != USER || senha != SENHA) {
        return res.json({ erro: "E-mail ou Senha Inválidos" });
    }

    const token = jwt.sign({email}, ACESS_TOKEN_KEY, { expiresIn: "60min" });
    res.json({ message: "autorizado", token, email })
});

app.get("/api/validacao", (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) { return res.status(403).json({ erro: "Não autorizado" }) };

    jwt.verify(token, ACESS_TOKEN_KEY, (error, decoded) => {
        if (error) { return res.status(403).json({ erro: "Não autorizado" }) };
        res.json({ message: "autorizado"})

    })
});


app.get("/api", (req, res) => {
    res.json({ day: ["name", "Neo Quimica Arena"] });
});

// Create
app.post("/register", async (req, res) => {

    try{const newWorkTime = await workTime.create(req.body);
    res.json(newWorkTime);}
    catch(error){
        res.json({error: error})
    };
});

// Read
app.get("/register", async (req, res) => {

    try{const workDaysTime = await workTime.find();
    res.json(workDaysTime);}
    catch(error){
        res.json({error: error})
    };
});

// Update
app.put("/register/:id", async (req, res) => {
    try{
        const newWorkDaysTime = await workTime.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json(newWorkDaysTime);}
    catch(error){
        res.json({error: error})
    };
});

// Delete
app.delete("/register/:id", async (req, res) => {
    try{
        const newWorkDaysTimeDeleted = await workTime.findByIdAndDelete(req.params.id);
        res.json(newWorkDaysTimeDelete);}
    catch(error){
        res.json({error: error})
    };
});

app.listen(8080, () => {
    console.log("Servidor funcionando");
});

