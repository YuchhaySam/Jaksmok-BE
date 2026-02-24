import express from "express";
import { basicAuth } from "../middlewares/basic-auth";
import {
  getAllListedBookSchema,
  getBookByIdSchema,
} from "../middlewares/validator.schema";
import { BookController } from "../controller/controller";
const route = express.Router();

route.get(
  "/books",
  basicAuth,
  getAllListedBookSchema,
  BookController.getAllListedBook,
);

route.get(
  "/books/:id",
  basicAuth,
  getBookByIdSchema,
  BookController.getBookById,
);

export default route;
