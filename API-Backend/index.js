const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const routes = require('./routes/route');
app.use('/api', routes);
console.log("route :>", routes)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
