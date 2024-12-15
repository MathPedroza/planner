const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());
app.use(express.json());

// Configuração dos proxies para cada serviço
app.use("/api/post", createProxyMiddleware({ 
  target: "http://localhost:5001",
  changeOrigin: true 
}));

app.use("/api/get", createProxyMiddleware({ 
  target: "http://localhost:5002",
  changeOrigin: true 
}));

app.use(["/api/update", "/api/remove"], createProxyMiddleware({ 
  target: "http://localhost:5003",
  changeOrigin: true 
}));

app.get("/", (req, res) => {
  res.send("API Gateway do Planner está funcionando.");
});

const PORT = 25565;
app.listen(PORT, () => {
  console.log(`Gateway rodando na porta ${PORT}`);
});