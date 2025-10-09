// Configuração carregada em runtime
window.APP_CONFIG = {
  API_URL:
    window.location.hostname === "localhost"
      ? "http://localhost:3001"
      : "http://135.222.249.57",
};
