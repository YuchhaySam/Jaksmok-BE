import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

//Validate the validationResult and output errors in a readable format if there is one
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const mapped = errors.mapped();
    const formatted = Object.keys(mapped).map((param) => ({
      field: param,
      message: mapped[param]?.msg,
    }));

    return res.status(400).json({
      message: "Validation failed",
      errors: formatted,
    });
  }
  next();
};
