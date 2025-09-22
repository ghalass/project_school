import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Pour __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

export default router;
