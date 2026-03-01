const dotenv = require("dotenv")
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"]
};

const {USER, SENHA} = process.env;


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/api/login", (req, res) => { 
    const {email, senha} = req.body;

    if(email === USER && senha === SENHA){
        return res.json({mensagem: true})

    }else{
        res.json({erro: "E-mail ou Senha Inválidos"});
    }

    
});

app.get("/api", (req, res) => {
    res.json({day:["name", "Neo Quimica Arena"]});
});
app.listen(8080, () => {
    console.log("Servidor funcionando");
});

