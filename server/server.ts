import "dotenv/config"; // After this import dotenv.config() is no longer required but keep it on top at line 1
import app from "./app.js";
import { connectDB } from "./config/db.js";

// Only allowed here on ES modules bcs it is the top lvl no need for async fn
await connectDB();

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
