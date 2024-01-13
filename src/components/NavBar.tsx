import { Link } from 'react-router-dom';

export default function NavBar() {
	return (
		<div className="App">
			<nav className="bg-blue-500 p-4">
				<ul className="flex space-x-4 text-white">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/books">Livros</Link>
					</li>
				</ul>
			</nav>
			<div className="container mx-auto mt-4"></div>
		</div>
	);
}
