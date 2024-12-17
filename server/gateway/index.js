const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());
app.use(express.json());

// Middleware para tratar requisições OPTIONS antes do proxy
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(200);
  }
  next();
});

// Configuração dos proxies para cada serviço
app.use(
  "/api/post",
  createProxyMiddleware({
    target: "http://localhost:25566",
    changeOrigin: true,
  })
);

app.use(
  "/api/get",
  createProxyMiddleware({
    target: "http://localhost:25568",
    changeOrigin: true,
  })
);

app.use(
  ["/api/update", "/api/remove"],
  createProxyMiddleware({
    target: "http://localhost:25567",
    changeOrigin: true,
  })
);

app.get("/", (req, res) => {
  res.send("API Gateway do Planner está funcionando.");
});

const PORT = 25565;
app.listen(PORT, () => {
  console.log(`Gateway rodando na porta ${PORT}`);
});
