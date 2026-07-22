import express from "express";
import {
  getAllSearchResults,
  getSuggestedSearchResults,
} from "../controllers/searchController.js";
import { validateQuery } from "../middlewares/queryHandler.js";
import {
  searchQuerySpec,
  suggestQuerySpec,
} from "../validation/searchQuerySpecs.js";

const searchRouter = express.Router();

searchRouter.get("/", validateQuery(searchQuerySpec), getAllSearchResults);
searchRouter.get(
  "/suggest",
  validateQuery(suggestQuerySpec),
  getSuggestedSearchResults,
);

export default searchRouter;
