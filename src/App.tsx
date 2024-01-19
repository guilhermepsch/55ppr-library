import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import BookController from './controllers/BookController';
import { ConcreteBookRepositoryCreator } from './patterns/factoryMethod/ConcreteBookRepositoryCreator';
import { ConcreteLoanRepositoryCreator } from './patterns/factoryMethod/ConcreteLoanRepositoryCreator';
import { ConcreteUserRepositoryCreator } from './patterns/factoryMethod/ConcreteUserRepositoryCreator';
import UserController from './controllers/UserController';
import LoanController from './controllers/LoanController';
import { LoanFacade } from './patterns/facade/LoanFacade';
import { ConcreteNetflixNavBarFactory } from './patterns/abstractFactory/factories/ConcreteNetflixNavBarFactory';
import { CocreteGitHubNavBarFactory } from './patterns/abstractFactory/factories/ConcreteGitHubNavBarFactory';
import { AbstractNavBarFactory } from './patterns/abstractFactory/interfaces/AbstractNavBarFactory';

function App() {

	let activeFactory: AbstractNavBarFactory;
	// activeFactory = new ConcreteNetflixNavBarFactory();
	activeFactory = new CocreteGitHubNavBarFactory();

	const bookRepositoryCreator = new ConcreteBookRepositoryCreator();
	const bookRepository = bookRepositoryCreator.create();
	const bookController = new BookController(bookRepository, activeFactory);

	const userRepositoryCreator = new ConcreteUserRepositoryCreator();
	const userRepository = userRepositoryCreator.create();
	const userController = new UserController(userRepository, activeFactory);

	const loanRepositoryCreator = new ConcreteLoanRepositoryCreator();
	const loanRepository = loanRepositoryCreator.create();
	const loanFacade = new LoanFacade(loanRepository, bookRepository, userRepository);
	const loanController = new LoanController(loanFacade, activeFactory);

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
			<Route path="/" element={<Home navBarFactory={activeFactory} />} />
		</Routes>
	);
}

export default App;
