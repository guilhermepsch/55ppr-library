import { Book } from '../models/Book';
import { Observer } from '../patterns/observer/Observer';
import { BookRepository } from '../repositories/BookRepository';
import { BookView } from '../views/BookView';

export default class BookController implements Observer {
	private bookRepository: BookRepository;
	private bookView: BookView;

	constructor(bookRepository: BookRepository) {
		this.bookRepository = bookRepository;
		this.bookView = new BookView(
			this.bookRepository.list(),
			this.delete.bind(this),
		);
		this.bookRepository.addObserver(this);
	}

	public create(
		title: string,
		author: string,
		isbn: string,
		availableCopies: number,
	): Book {
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

	public update(
		id: number,
		title: string,
		author: string,
		isbn: string,
		availableCopies: number,
	): Book | undefined {
		const book = new Book(id, title, author, true, isbn, availableCopies);

		return this.bookRepository.update(book);
	}

	public delete(id: number) {
		return this.bookRepository.delete(id);
	}

	public list(): Book[] {
		return this.bookRepository.list();
	}

	public getView(): BookView {
		return this.bookView;
	}

	public updateFromObserver(): void {
		this.bookView.updateTable(this.list());
        console.log('BookController: updateFromObserver');
	}
}
