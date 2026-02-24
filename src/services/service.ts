import { books } from "../mock-data/data";
import { Book, PaginationResponse } from "../types/type";

export class BookService {
  static async getBookById(id: number): Promise<Book> {
    const foundBook = books.find((b) => b.id === id);
    if (!foundBook) {
      throw new Error("NOT_FOUND");
    }
    return foundBook;
  }

  static async getAllListedBook(
    page: number,
    size: number,
  ): Promise<PaginationResponse> {
    const start = page * size;
    const end = start + size;
    const paginatedItems = books.slice(start, end);

    const response: PaginationResponse = {
      size,
      totalElements: books.length,
      page,
      totalPages: Math.ceil(books.length / size),
      content: paginatedItems,
    };
    return response;
  }
}
