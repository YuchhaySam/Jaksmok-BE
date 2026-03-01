import { checkSchema } from "express-validator";

/*
  Validates request to ensure type-safety
  and sanitize unwanted request
*/

export const getBookByIdSchema = checkSchema({
  id: {
    in: ["params"],
    isInt: {
      options: { min: 0 },
      errorMessage: "id must be a number",
    }, // Check that params are numeric; reject non-numeric input.
    toInt: true, //Convert string to number
  },
});

export const getAllListedBookSchema = checkSchema({
  page: {
    in: ["query"],
    optional: true,
    isInt: {
      options: { min: 0 },
      errorMessage: "page must be a number",
    },
    toInt: true,
  },
  size: {
    in: ["query"],
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: "size must be a number",
    },
    toInt: true,
  },
});
