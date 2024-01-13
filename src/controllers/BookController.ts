import { Book } from "../models/Book";
import { BookRepository } from "../repositories/BookRepository";
import BookView from "../views/BookView";

export default class BookController {
    private bookRepository: BookRepository;
    private bookView: JSX.Element;

    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
        this.bookView = BookView({ books: this.bookRepository.list(), handleDelete: this.delete.bind(this) });
    }

    public create(title: string, author: string, isbn: string, availableCopies: number): Book {
        const book = new Book(
            this.bookRepository.list().length + 1,
            title,
            author,
            true,
            isbn,
            availableCopies,
        );

        return this.bookRepository.save(book);
    }

    public update(id: number, title: string, author: string, isbn: string, availableCopies: number): Book | undefined {
        const book = new Book(
            id,
            title,
            author,
            true,
            isbn,
            availableCopies,
        );

        return this.bookRepository.update(book);
    }

    public delete(id: number) {
        return this.bookRepository.delete(id);
    }
  
    public list(): Book[] {
        return this.bookRepository.list();
    }

    public renderView(): JSX.Element {
        return this.bookView;
    }
}