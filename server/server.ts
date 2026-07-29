import "dotenv/config"; // After this import dotenv.config() is no longer required but keep it on top at line 1
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRouter from "./routers/productRouter.js";
import subCategoryRouter from "./routers/subCategoryRouter.js";
import categoryRouter from "./routers/categoryRouter.js";
import brandRouter from "./routers/brandRouter.js";
import promotionRouter from "./routers/promotionRouter.js";
import searchRouter from "./routers/searchRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { appLimiter, searchLimiter } from "./middlewares/rateLimiter.js";
import { NotFoundError } from "./errors/AppError.js";

// Only allowed here on ES modules bcs it is the top lvl no need for async fn
await connectDB();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // only allow deployed FE server and dev server to send req
  }),
);

//noUnusedParameters  doesn't allow to use req if I add _ before it will pass the test of it
//Health Check
app.get("/", (_req, res) => {
  res.send("Backend is running!!!");
});

app.use(appLimiter);

app.use(express.json());

app.use("/api/v1/products", productRouter);
app.use("/api/v1/subcategories", subCategoryRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/promotions", promotionRouter);
app.use("/api/v1/search", searchLimiter, searchRouter);

// It is basically for all the paths  since no path specified as the first arg
// Only the routes that don't exist will reach it
app.use((_req, _res, next) => next(new NotFoundError("Route not found")));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
