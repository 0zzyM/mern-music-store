import express from "express";
import {
  getAllSearchResults,
  getSuggestedSearchResults,
} from "../controllers/searchController.js";

const searchRouter = express.Router();

searchRouter.get("/", getAllSearchResults);
searchRouter.get("/suggest", getSuggestedSearchResults);

export default searchRouter;
