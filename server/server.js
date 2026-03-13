// const importName = require("libraryName")
import dotenv from "dotenv"
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
const { USERSTR, NAMESTR, USER_ID, SENHA, ACESS_TOKEN_KEY, MONGO_URI } = process.env;

const USER = USERSTR.replace("'", "").split(",")
const SENHALIST = SENHA.replace("'", "").split(",")
const NAMES = NAMESTR.replace("'", "").split(",")

// Conecta ao banco de dados
const connectDB = async () => {

    try {
        // Link do MongoDB
        await mongoose.connect(MONGO_URI)
        console.log("conectado ao mongo")
    }
    catch (error) {
        console.log("deu erro", error)
    }
}

connectDB();

// Express vai utilizar o cors, com as opções pré-definidas
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Criação de um endpoint
app.post("/api/login", (req, res) => {
    const { email, senha } = req.body;

    const index = USER.indexOf(email);

    if (index == -1) {
        return res.json({ erro: "E-mail ou Senha Inválidos" });
    }
    else{
        if(senha == SENHALIST[index]){
            const token = jwt.sign({ USER_ID:USER_ID[index]}, ACESS_TOKEN_KEY, { expiresIn: "60min" });
            res.json({ message: "autorizado", token, email, name:NAMES[index]})
        }else{
            return res.json({ erro: "E-mail ou Senha Inválidos" })
        }
    }
    
});

app.get("/api/validacao", (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) { return res.status(403).json({ erro: "Não autorizado" }) };

    jwt.verify(token, ACESS_TOKEN_KEY, (error, decoded) => {
        if (error) { return res.status(403).json({ erro: "Não autorizado" }) };
        res.json({ message: "autorizado" })

    })
});

// Create
app.post("/register", async (req, res) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) { return res.status(403).json({ erro: "Não autorizado" }) };

    jwt.verify(token, ACESS_TOKEN_KEY, async (error, decoded) => {
        if (error) { return res.status(403).json({ erro: "Não autorizado" }) };
        const userID = decoded
        try {
            const newWorkTime = await workTime.create({ ...req.body, "userID": userID.USER_ID });
            res.json(newWorkTime);
        }
        catch (error) {
            res.json({ error: error })
        };
    });
})


// Read
app.get("/register", async (req, res) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) { return res.status(403).json({ erro: "Não autorizado" }) };

    jwt.verify(token, ACESS_TOKEN_KEY, async (error, decoded) => {
        try {
            const workDaysTime = await workTime.find({ "userID": decoded.USER_ID });
            res.json(workDaysTime);
        }
        catch (error) {
            res.json({ error: error })
        };
    });
});

// Update
app.put("/register", async (req, res) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) { return res.status(403).json({ erro: "Não autorizado" }) };

    jwt.verify(token, ACESS_TOKEN_KEY, async (error, decoded) => {
        if (error) { return res.status(403).json({ erro: "Não autorizado" }) };
        try {
            const newWorkDaysTime = await workTime.findOneAndUpdate({ _id: req.body._id, userID: decoded.USER_ID }, req.body, { new: true });
            res.json(newWorkDaysTime);
        }
        catch (error) {
            res.json({ error: error })
        };
    })

});

// Delete
app.delete("/register", async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, ACESS_TOKEN_KEY, async (error, decoded) => {
        if (error) { return res.status(403).json({ error: "Não autorizado" }) };
        try {

            const newWorkDaysTimeDeleted = await workTime.findOneAndDelete({ _id: req.body._id, userID: decoded.USER_ID });
            res.json(newWorkDaysTimeDeleted);
            
        }
        catch (error) {
            res.json({ error: error })
        };
    });
});

app.listen(8080, () => {
    console.log("Servidor funcionando");
});

