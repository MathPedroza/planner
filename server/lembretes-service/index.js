const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db.config");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Serviço de criação rodando na porta ${PORT}`);
});