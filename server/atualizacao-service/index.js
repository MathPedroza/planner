const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db.config");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para atualizar um lembrete
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

// Rota para remover um lembrete
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

const PORT = 5003;
app.listen(PORT, () => {
  console.log(`Serviço de atualização/remoção rodando na porta ${PORT}`);
});