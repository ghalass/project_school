// corsOptions.js

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://school.ghalass.com", // ajout pour production
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsOptions;
