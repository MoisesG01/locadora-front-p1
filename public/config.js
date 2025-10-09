// Configuração carregada em runtime
window.APP_CONFIG = {
  API_URL:
    window.location.hostname === "localhost" ? "http://localhost:3001" : "/api", // Usa o proxy do servidor Express
};
