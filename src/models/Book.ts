export class Book {
	id: number;
	title: string;
	author: string;
	isAvailable: boolean;
	isbn: string;
	availableCopies: number;

	constructor(
		id: number,
		title: string,
		author: string,
		isAvailable: boolean,
		isbn: string,
		availableCopies: number,
	) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.isAvailable = isAvailable;
		this.isbn = isbn;
		this.availableCopies = availableCopies;
	}
}
