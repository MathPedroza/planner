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
app.use(bodyParser.urlencoded({ extended: true }));

// Teste de conexão com o banco de dados
db.getConnection((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  }
});

// Rota para obter todos os lembretes
app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM lembretes";
  db.query(sqlGet, (error, result) => {
    if (error) {
      console.error("Erro ao buscar lembretes:", error);
      return res.status(500).send("Erro ao buscar lembretes.");
    }
    res.status(200).json(result);
  });
});

// Rota para adicionar um novo lembrete
app.post("/api/post", (req, res) => {
  const { descricao, datalembrete, categoria, obs, statusL } = req.body;
  const sqlInsert =
    "INSERT INTO lembretes (descricao, datalembrete, categoria, obs, statusL) VALUES (?, ?, ?, ?, ?)";
  db.query(sqlInsert, [descricao, datalembrete, categoria, obs, statusL], (error, result) => {
    if (error) {
      console.error("Erro ao adicionar lembrete:", error);
      return res.status(500).send("Erro ao adicionar lembrete.");
    }
    res.status(201).send("Lembrete adicionado com sucesso.");
  });
});

// Rota para remover um lembrete por ID
app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM lembretes WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.error("Erro ao remover lembrete:", error);
      return res.status(500).send("Erro ao remover lembrete.");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Lembrete não encontrado.");
    }
    res.status(200).send("Lembrete removido com sucesso.");
  });
});

// Rota para obter um lembrete por ID
app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM lembretes WHERE id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.error("Erro ao buscar lembrete:", error);
      return res.status(500).send("Erro ao buscar lembrete.");
    }
    if (result.length === 0) {
      return res.status(404).send("Lembrete não encontrado.");
    }
    res.status(200).json(result[0]);
  });
});

// Rota para atualizar um lembrete por ID
app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { descricao, datalembrete, categoria, obs, statusL } = req.body;
  const sqlUpdate =
    "UPDATE lembretes SET descricao = ?, datalembrete = ?, categoria = ?, obs = ?, statusL = ? WHERE id = ?";
  db.query(sqlUpdate, [descricao, datalembrete, categoria, obs, statusL, id], (error, result) => {
    if (error) {
      console.error("Erro ao atualizar lembrete:", error);
      return res.status(500).send("Erro ao atualizar lembrete.");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Lembrete não encontrado.");
    }
    res.status(200).send("Lembrete atualizado com sucesso.");
  });
});

// Rota raiz
app.get("/", (req, res) => {
  res.send("API do Planner está funcionando.");
});

// Inicializar o servidor
app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
