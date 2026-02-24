import { checkSchema } from "express-validator";

// Validates and sanitizes request to ensure type-safety for the Service layer

export const getBookByIdSchema = checkSchema({
  id: {
    in: ["params"],
    isInt: {
      options: { min: 0 },
      errorMessage: "id must be a number",
    }, //Check to if the params is an actual number (if parmas contain a letter, it will be rejected)
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
