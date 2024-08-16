import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private books = [
    { id: 1, title: 'Book 1', author: 'Author 1', publishedYear: 2020 },
    { id: 2, title: 'Book 2', author: 'Author 2', publishedYear: 2019 },
  ];

  create(createBookDto: CreateBookDto) {
    const id = this.books.length + 1;
    const newBook = { id, ...createBookDto };
    this.books.push(newBook);
    return newBook;
  }

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    const book = this.books.find((book) => book.id === id);
    return book || { message: 'Book not found' };
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      return { message: 'Book not found' };
    }
    this.books[bookIndex] = { ...this.books[bookIndex], ...updateBookDto };
    return this.books[bookIndex];
  }

  remove(id: number) {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      return { message: 'Book not found' };
    }

    const deletedBook = this.books.splice(bookIndex, 1);
    return deletedBook[0];
  }
}
