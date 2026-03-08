import { BookEntity } from "../entity/book.entity";

export interface PaginationResponse {
  size: number;
  totalElements: number;
  page: number;
  totalPages: number;
  content: BookEntity[];
}
