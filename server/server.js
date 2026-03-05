// const importName = require("libraryName")
const dotenv = require("dotenv")
// Além de importar o dotenv, é preciso chamar essa função pra deixar configurado
dotenv.config();

const express = require("express");
// Configura uma variável para chamar o express
const app = express();

const cors = require("cors");
const corsOptions = {
    origin: "https://banco-de-horas-khaki.vercel.app", // String direta do servidor de Front
    methods: ["GET", "POST", "PUT", "DELETE"], // Define os métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"] // Garante que o Token passe no header

};

// Json Web Token
const jwt = require("jsonwebtoken")

// Processa dados do .env
const { USER, SENHA, ACESS_TOKEN_KEY } = process.env;

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
app.listen(8080, () => {
    console.log("Servidor funcionando");
});

