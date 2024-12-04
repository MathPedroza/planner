const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "mysql-project-project-math.l.aivencloud.com",
    user: "avnadmin",
    port: "22302",
    password: "AVNS_GS3FU3g4PMXjjcF4rMg",
    database: "planner",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM lembretes";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
    const { descricao, datalembrete, categoria, concluido } = req.body;
    const sqlInsert =
        "INSERT INTO lembretes (descricao, datalembrete, categoria, concluido) VALUS (?, ?, ?, ?)";
    db.query(sqlInsert, [descricao, datalembrete, categoria, concluido], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove =
        "DELETE FROM lembretes WHERE id = : ?";
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM lembretes WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { descricao, datalembrete, categoria, concluido } = req.body;
    const slqUpdate = "UPDATE lembretes SET descricao = ?, datalembrete = ?, categoria = ?, concluido = ? WHERE id = ?";
    db.query(slqUpdate, [descricao, datalembrete, categoria, concluido, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/", (req, res) => {
    //   
});

app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000");
})
