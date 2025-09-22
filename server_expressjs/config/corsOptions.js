// corsOptions.js

const corsOptions = {
  origin: true, // "true" renvoie l’origine de la requête, compatible avec credentials
  credentials: true, // nécessaire si tu envoies des cookies
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsOptions;
