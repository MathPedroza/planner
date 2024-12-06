const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

/* Em nosso projeto, utilizaremos o CORS (Cross-origin Resource Sharing) é um mecanismo usado para adicionar 
cabeçalhos HTTP que informam aos navegadores para permitir que uma aplicação Web 
seja executada em uma origem e acesse recursos de outra origem diferente 

Também vamos utilizar o body parser que trata-se de um módulo que serve para analisar e converter os dados 
de entrada de uma requisição para vários formatos, como o JSON. Ele permite que clientes externos enviem 
informações para uma aplicação Node.js, feita com Javascript, e receber dados de formulários*/

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

/* Método GET para realizar consultas no banco de dados (SELECT * FROM) */
app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM lembretes";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

/* O método POST irá realizar a instrução de INSERT no banco de Dados */
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

/* API para remover dados da tabela do Banco de Dados
para deletar, é necessário passar o parâmtro "id" */
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


/* Método para retornar um consulta SQL, em um determinado registro
utilizando o "id" como parâmetro*/
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

/* API para atualizar(UPDATE) dados da tabela do Banco de Dados
para atualizar, é necessário passar o parêmtro "id" */
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
