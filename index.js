import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Artikel from "./routes/artikel.js";
import Class from "./routes/class.js";
import Tugas from "./routes/assignment.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const documentPath = path.join(__dirname, 'document');

app.use('/document', express.static(documentPath));

app.use(cors());
app.use(express.json());
app.use(Artikel);
app.use(Class);
app.use(Tugas);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
