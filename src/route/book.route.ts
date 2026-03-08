import express from "express";
import { validateAuth } from "../middlewares/auth";
import {
  getAllListedBookSchema,
  getBookByIdSchema,
} from "../middlewares/schema";
import { BookController } from "../controller/book.controller";
import { validate } from "../middlewares/validator";
const route = express.Router();

route.get(
  "/books",
  validateAuth,
  getAllListedBookSchema,
  validate,
  BookController.listBooks,
);

route.get(
  "/books/:id",
  validateAuth,
  getBookByIdSchema,
  validate,
  BookController.getBookById,
);

export default route;
