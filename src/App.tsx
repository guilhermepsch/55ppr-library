import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import BookController from './controllers/BookController';
import { BookRepository } from './repositories/BookRepository';

function App() {
	const bookRepository = new BookRepository();
	const bookController = new BookController(bookRepository);

	return (
		<Routes>
					<Route path="/books" element={bookController.getView().renderView()} />
					<Route path="/" element={<Home />} />
		</Routes>
	);
}

export default App;
