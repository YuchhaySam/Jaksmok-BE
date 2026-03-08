import { MysqlDataSource } from "../database/data-source";
import { BookEntity } from "../entity/book.entity";
import { PaginationResponse } from "../types/book.type";

//Handle only the logic
export class BookService {
  static async getBookById(id: number): Promise<BookEntity> {
    const bookRepo = MysqlDataSource.getRepository(BookEntity);
    const foundBook = await bookRepo.findOneBy({ id });
    if (!foundBook) throw new Error("NOT_FOUND");

    return foundBook;
  }

  static async listBooks(
    page: number,
    size: number,
  ): Promise<PaginationResponse> {
    const bookRepo = MysqlDataSource.getRepository(BookEntity);
    const [books, totalElements] = await bookRepo.findAndCount({
      skip: page * size,
      take: size,
      order: { id: "ASC" },
    });

    const totalPages = Math.ceil(totalElements / size);
    return {
      size,
      totalElements,
      page,
      totalPages,
      content: books,
    };
  }

  static async createBook(books: BookEntity[]): Promise<void> {
    if (books.length === 0 || !books) throw new Error("Invalid configuration");
    await MysqlDataSource.manager.upsert(BookEntity, books, ["id"]);
  }
}
