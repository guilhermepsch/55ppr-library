import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import BookController from './controllers/BookController';
import { ConcreteBookRepositoryCreator } from './patterns/factoryMethod/ConcreteBookRepositoryCreator';
import { ConcreteLoanRepositoryCreator } from './patterns/factoryMethod/ConcreteLoanRepositoryCreator';
import { ConcreteUserRepositoryCreator } from './patterns/factoryMethod/ConcreteUserRepositoryCreator';
import UserController from './controllers/UserController';
import LoanController from './controllers/LoanController';
import { LoanFacade } from './patterns/facade/LoanFacade';

function App() {
	const bookRepositoryCreator = new ConcreteBookRepositoryCreator();
	const bookRepository = bookRepositoryCreator.create();
	const bookController = new BookController(bookRepository);

	const userRepositoryCreator = new ConcreteUserRepositoryCreator();
	const userRepository = userRepositoryCreator.create();
	const userController = new UserController(userRepository);


	const loanRepositoryCreator = new ConcreteLoanRepositoryCreator();
	const loanRepository = loanRepositoryCreator.create();
	const loanFacade = new LoanFacade(loanRepository, bookRepository, userRepository);
	const loanController = new LoanController(loanFacade);



	return (
		<Routes>
			<Route
				path="/users"
				element={userController.getView().renderView()}
			/>
			<Route
				path="/books"
				element={bookController.getView().renderView()}
			/>
			<Route
				path="/loans"
				element={loanController.getView().renderView()}
			/>
			<Route path="/" element={<Home />} />
		</Routes>
	);
}

export default App;
