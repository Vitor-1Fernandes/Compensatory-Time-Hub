const dotenv = require("dotenv")
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:5173", // String direta é mais garantida
    methods: ["GET", "POST", "PUT", "DELETE"], // Define os verbos permitidos
    allowedHeaders: ["Content-Type", "Authorization"] // Garante que o Token passe

};
const jwt = require("jsonwebtoken")

const { USER, SENHA, ACESS_TOKEN_KEY } = process.env;


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/login", (req, res) => {
    const { email, senha } = req.body;

    if (email != USER || senha != SENHA) {
        return res.json({ erro: "E-mail ou Senha Inválidos" });
    }

    const token = jwt.sign({ email }, ACESS_TOKEN_KEY, { expiresIn: "60min" });
    res.json({ message: "autorizado", token })
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

