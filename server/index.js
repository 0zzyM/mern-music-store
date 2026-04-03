import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

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
