import { Book } from "../models/Book";
import { Observable } from "../patterns/observer/Observable";
import { Repository } from "./Repository";

export class BookRepository extends Observable implements Repository<Book> {

    private books: Book[] = [new Book(1, "The Lord of the Rings", "J. R. R. Tolkien", true, "9780007525546", 3)];

    public save(book: Book): Book {
        this.books.push(book);
        this.notifyObservers();
        return book;
    }

    public findById(id: number): Book | undefined {
        return this.books.find(book => book.id === id);
    }

    public findByTitle(title: string): Book | undefined {
        return this.books.find(book => book.title === title);
    }

    public list(): Book[] {
        return this.books;
    }

    public update(book: Book): Book {
        const index = this.books.findIndex(item => item.id === book.id);
        this.books[index] = book;
        this.notifyObservers();
        return book;
    }

    public delete(id: number): void {
        const index = this.books.findIndex(item => item.id === id);
        this.books.splice(index, 1);
        this.notifyObservers();
    }

}
