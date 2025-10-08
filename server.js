const express = require("express");
const path = require("path");
const app = express();

// Serve os arquivos estáticos da pasta build
app.use(express.static(path.join(__dirname, "build")));

// Para qualquer requisição que não seja de arquivo estático, retorna o index.html
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Usa a porta fornecida pelo Azure ou 8080 como fallback
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
