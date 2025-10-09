const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

// Proxy para a API (resolve problema de Mixed Content)
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://135.222.249.57",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // Remove /api do path
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(`[Proxy] ${req.method} ${req.url} -> http://135.222.249.57${req.url.replace('/api', '')}`);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`[Proxy Response] ${proxyRes.statusCode} for ${req.method} ${req.url}`);
    },
    onError: (err, req, res) => {
      console.error(`[Proxy Error] ${req.method} ${req.url}:`, err.message);
    },
  })
);

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
  console.log(`Proxying API requests to http://135.222.249.57`);
});
