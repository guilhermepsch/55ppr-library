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
			this.upsert.bind(this),
		);
		this.bookRepository.addObserver(this);
	}

	public upsert(
		id: number,
		title: string,
		author: string,
		isAvailable: boolean,
		isbn: string,
		availableCopies: number,
	) {
		if (Number.isNaN(id) || id == undefined) {
			id = 0;
		}
		if (title == undefined) {
			throw new Error('Title is required');
		}
		if (author == undefined) {
			throw new Error('Author is required');
		}
		if (isbn == undefined) {
			throw new Error('ISBN is required');
		}
		if (Number.isNaN(availableCopies) || availableCopies == undefined) {
			availableCopies = 0;
		}
		const book = new Book(
			id,
			title,
			author,
			isAvailable,
			isbn,
			availableCopies,
		);
		return this.bookRepository.upsert(book);
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
		console.log('Updating book view');
		this.bookView.updateTable(this.list());
	}
}
