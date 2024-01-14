import NavBar from '../components/NavBar';
import { Book } from '../models/Book';

export class BookView {
	books: Book[];
	handleDelete: (id: number) => void;
	handleSave: (
		id: number,
		title: string,
		author: string,
		isAvailable: boolean,
		isbn: string,
		availableCopies: number,
	) => void;

	constructor(
		books: Book[],
		handleDelete: (id: number) => void,
		handleSave: (
			id: number,
			title: string,
			author: string,
			isAvailable: boolean,
			isbn: string,
			availableCopies: number,
		) => void,
	) {
		this.books = books;
		this.handleDelete = handleDelete;
		this.handleSave = handleSave;
	}

	public updateTable(books: Book[]) {
		this.books = books;
		const tbody = document.getElementById('book-tbody');
		if (!tbody) return;
		tbody.innerHTML = '';
		books.forEach(book => {
			tbody.appendChild(this.createBookRow(book));
		});
	}

	public edit(id: number) {
		const book = this.books.find(book => book.id === id);
		if (!book) return;
		this.getFormFieldId().value = book.id.toString();
		this.getFormFieldTitle().value = book.title;
		this.getFormFieldAuthor().value = book.author;
		this.getFormFieldIsbn().value = book.isbn;
		this.getFormFieldAvailableCopies().value =
			book.availableCopies.toString();
		this.getFormFieldIsAvailable().value = book.isAvailable.toString();
	}

	public renderView(): JSX.Element {
		return (
			<>
				<NavBar />
				<div className="w-full flex items-center flex-col">
					{this.getBookForm()}
					<h2 className="text-3xl font-bold mb-4">Book List</h2>
					<table
						className="min-w-full divide-y divide-gray-200"
						id="book-table">
						<thead>
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Title
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Author
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Available
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									ISBN
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Available Copies
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Action
								</th>
							</tr>
						</thead>
						<tbody id="book-tbody"></tbody>
					</table>
				</div>
			</>
		);
	}

	public createBookRow(book: Book) {
		const row = document.createElement('tr');
	
		const idCell = document.createElement('td');
		idCell.textContent = book.id.toString();
		idCell.classList.add('px-6', 'py-4', 'whitespace-nowrap');
	
		const titleCell = document.createElement('td');
		titleCell.textContent = book.title;
		titleCell.classList.add('px-6', 'py-4', 'whitespace-nowrap');

		const authorCell = document.createElement('td');
		authorCell.textContent = book.author;
		authorCell.classList.add('px-6', 'py-4', 'whitespace-nowrap');

		const isAvailableCell = document.createElement('td');
		isAvailableCell.textContent = book.isAvailable.toString();
		isAvailableCell.classList.add('px-6', 'py-4', 'whitespace-nowrap');

		const isbnCell = document.createElement('td');
		isbnCell.textContent = book.isbn;
		isbnCell.classList.add('px-6', 'py-4', 'whitespace-nowrap');

		const availableCopiesCell = document.createElement('td');
		availableCopiesCell.textContent = book.availableCopies.toString();
		availableCopiesCell.classList.add('px-6', 'py-4', 'whitespace-nowrap');
		
		const deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.classList.add('px-4', 'py-1', 'font-semibold', 'text-red-500', 'bg-transparent', 'border', 'border-red-500', 'rounded', 'hover:bg-red-500', 'hover:text-white', 'hover:border-transparent', 'transition', 'duration-300', 'ease-in-out');
		deleteButton.addEventListener('click', () => {
			this.handleDelete(book.id);
		});
	
		const editButton = document.createElement('button');
		editButton.textContent = 'Edit';
		editButton.classList.add('px-4', 'py-1', 'font-semibold', 'text-blue-500', 'bg-transparent', 'border', 'border-blue-500', 'rounded', 'hover:bg-blue-500', 'hover:text-white', 'hover:border-transparent', 'transition', 'duration-300', 'ease-in-out');
		editButton.addEventListener('click', () => {
			this.edit(book.id);
		});
	
		const actionsCell = document.createElement('td');
		actionsCell.classList.add('px-6', 'py-4', 'whitespace-nowrap', 'flex', 'gap-3');
		actionsCell.appendChild(deleteButton);
		actionsCell.appendChild(editButton);

		row.appendChild(idCell);
		row.appendChild(titleCell);
		row.appendChild(authorCell);
		row.appendChild(isAvailableCell);
		row.appendChild(isbnCell);
		row.appendChild(availableCopiesCell);
		row.appendChild(actionsCell);

		return row;
	}

	public getBookForm() {
		return (
			<div className="w-full flex items-center flex-col">
				<h2 className="text-3xl font-bold mb-4">Add Book</h2>
				<form id="book-form" className="w-full max-w-lg">
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full px-3 mb-6">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="id">
								ID
							</label>
							<input
								id="id"
								name="id"
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
								type="number"
								placeholder="ID"
								disabled
							/>
						</div>
						<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="title">
								Title
							</label>
							<input
								id="title"
								name="title"
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								type="text"
								placeholder="Title"
							/>
						</div>
						<div className="w-full md:w-1/2 px-3">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="author">
								Author
							</label>
							<input
								id="author"
								name="author"
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
								type="text"
								placeholder="Author"
							/>
						</div>
					</div>
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full px-3">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="isbn">
								ISBN
							</label>
							<input
								id="isbn"
								name="isbn"
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
								type="text"
								placeholder="ISBN"
							/>
						</div>
					</div>
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="availableCopies">
								Available Copies
							</label>
							<input
								id="availableCopies"
								name="availableCopies"
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								type="number"
								placeholder="Available Copies"
							/>
						</div>
						<div className="w-full md:w-1/2 px-3">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="isAvailable">
								Available
							</label>
							<div className="relative">
								<select
									id="isAvailable"
									name="isAvailable"
									className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
									<option value="true">Yes</option>
									<option value="false">No</option>
								</select>
								<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
									<svg
										className="fill-current h-4 w-4"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20">
										<path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
									</svg>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-wrap -mx-3 mb-2">
						<div className="w-full flex flex-row justify-between gap-10 mx-3">
							<button
								type="submit"
								className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								onClick={e => {
									e.preventDefault();
									this.handleSave(
										parseInt(this.getFormFieldId().value),
										this.getFormFieldTitle().value,
										this.getFormFieldAuthor().value,
										this.getFormFieldIsAvailable().value ===
											'true',
										this.getFormFieldIsbn().value,
										parseInt(
											this.getFormFieldAvailableCopies()
												.value,
										),
									);
									this.resetForm();
								}}>
								Salvar
							</button>
							<button
								type="button"
								className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								onClick={e => {
									e.preventDefault();
									this.resetForm();
								}}>
								Reset
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
	

	public getFormFieldId() {
		return document.getElementById('id') as HTMLInputElement;
	}

	public getFormFieldTitle() {
		return document.getElementById('title') as HTMLInputElement;
	}

	public getFormFieldAuthor() {
		return document.getElementById('author') as HTMLInputElement;
	}

	public getFormFieldIsbn() {
		return document.getElementById('isbn') as HTMLInputElement;
	}

	public getFormFieldAvailableCopies() {
		return document.getElementById('availableCopies') as HTMLInputElement;
	}

	public getFormFieldIsAvailable() {
		return document.getElementById('isAvailable') as HTMLInputElement;
	}

	public getForm() {
		return document.getElementById('book-form') as HTMLFormElement;
	}

	public resetForm() {
		this.getForm().reset();
	}
}
