import { Book } from '../models/Book';
import { Observable } from '../patterns/observer/Observable';
import { Repository } from './Repository';

export class BookRepository extends Observable implements Repository<Book> {
	private books: Book[] = [];
	private static instance: BookRepository;
	private id: number = 1;

	public upsert(book: Book): Book {
		if (book.id == 0 || book.id == undefined) {
			return this.save(book);
		}
		return this.update(book);
	}

	public save(book: Book): Book {
		book.id = this.id++;
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
		return [...this.books];
	}

	public update(book: Book): Book {
		const previousBook = this.findById(book.id);
		if (!previousBook) {
			throw new Error('Book not found');
		}
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

	public static getInstance(): BookRepository {
		if (!BookRepository.instance) {
			BookRepository.instance = new BookRepository();
		}
		return BookRepository.instance;
	}
}
