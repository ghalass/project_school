// corsOptions.js

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"], // ✅ Spécifiez vos URLs frontend
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsOptions;
