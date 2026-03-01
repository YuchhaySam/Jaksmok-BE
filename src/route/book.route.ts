import express from "express";
import { basicAuth } from "../middlewares/basic-auth";
import {
  getAllListedBookSchema,
  getBookByIdSchema,
} from "../middlewares/schema";
import { BookController } from "../controller/book.controller";
import { validate } from "../middlewares/validator";
const route = express.Router();

route.get(
  "/books",
  basicAuth,
  getAllListedBookSchema,
  validate,
  BookController.listBooks,
);

route.get(
  "/books/:id",
  basicAuth,
  getBookByIdSchema,
  validate,
  BookController.getBookById,
);

export default route;
