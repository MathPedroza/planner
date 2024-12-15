const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db.config");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Serviço de consulta rodando na porta ${PORT}`);
});