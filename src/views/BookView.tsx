import NavBar from '../components/NavBar';
import { Book } from '../models/Book';

export class BookView {
	books: Book[];
	handleDelete: (id: number) => void;

	constructor(books: Book[], handleDelete: (id: number) => void) {
		this.books = books;
		this.handleDelete = handleDelete;
	}

	public updateTable(books: Book[]) {
    this.books = books;
		document.getElementById('book-tbody')!.innerHTML = '';
    document.getElementById('book-tbody')!.innerHTML = this.getBookTable().join('');
	}

	public getBookTable() {
		return this.books.map(book => (
			<tr key={book.id}>
				<td className="px-6 py-4 whitespace-nowrap">{book.id}</td>
				<td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
				<td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
				<td className="px-6 py-4 whitespace-nowrap">
					{book.isAvailable ? 'Yes' : 'No'}
				</td>
				<td className="px-6 py-4 whitespace-nowrap">{book.isbn}</td>
				<td className="px-6 py-4 whitespace-nowrap">
					{book.availableCopies}
				</td>
				<td className="px-6 py-4 whitespace-nowrap">
					<button
						onClick={() => this.handleDelete(book.id)}
						className="px-4 py-1 font-semibold text-red-500 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white hover:border-transparent transition duration-300 ease-in-out">
						Delete
					</button>
				</td>
			</tr>
		));
	}

	public renderView(): JSX.Element {
		console;
		return (
			<>
				<NavBar />
				<div className="w-full flex items-center flex-col">
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
						<tbody id='book-tbody'>
              {this.getBookTable()}
            </tbody>
					</table>
				</div>
			</>
		);
	}
}
