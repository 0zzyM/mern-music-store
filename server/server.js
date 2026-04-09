import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// Apperantly this needs to be on top otherwise process.env will get undefined
dotenv.config(); // remember this loads .env into process.env
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173", // only allow React dev server to send req
  }),
);

app.get("/", (req, res) => {
  res.send("Backend is running!!!");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
