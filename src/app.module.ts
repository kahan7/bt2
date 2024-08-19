import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { BooksController } from './books/books.controller';
import { BooksModule } from './books/books.module';
import { BooksService } from './books/books.service';
@Module({
  imports: [BooksModule],
  controllers: [AppController, CatsController, BooksController],
  providers: [AppService, BooksService],
})
export class AppModule { }
