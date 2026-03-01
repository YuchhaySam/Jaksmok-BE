import { Request, Response, NextFunction } from "express";
import { BookService } from "../services/book.service";
import { matchedData } from "express-validator";

//Handle only request and response
export class BookController {
  static async getBookById(
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void> {
    try {
      // Filter request to ensure we only work with data that passed validation.
      const { id } = matchedData(req, { locations: ["params"] });
      const book = await BookService.getBookById(id);
      res.status(200).json(book);
    } catch (error) {
      if ((error as Error).message === "NOT_FOUND") {
        res.status(404).json({ message: "Book not found" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async listBooks(
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void> {
    try {
      const { size = 20, page = 0 } = matchedData(req, {
        locations: ["query"],
      });
      const paginatedResults = await BookService.listBooks(page, size);
      res.status(200).json(paginatedResults);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
