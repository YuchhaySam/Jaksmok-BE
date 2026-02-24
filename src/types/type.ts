export interface Book {
  id: number;
  title: string;
  author: string;
  year: string;
  country: string;
  language: string;
  pages: number;
  wikipediaLink: string;
  imageUrl: string;
}

export interface PaginationResponse {
  size: number;
  totalElements: number;
  page: number;
  totalPages: number;
  content: Book[];
}
