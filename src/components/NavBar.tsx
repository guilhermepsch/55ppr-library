import { Link } from 'react-router-dom';

interface NavBarProps {
	clearTable: () => void;
}

export default function NavBar({ clearTable }: NavBarProps) {
	return (
		<nav className="bg-gray-800 text-white p-4">
			<div className="flex justify-between">
				<div className="flex">
					<Link
						to="/"
						className="text-2xl font-bold hover:text-gray-300"
						onClick={clearTable}
					>
						Biblioteca
					</Link>
					<Link
						to="/users"
						className="ml-4 hover:text-gray-300"
						onClick={clearTable}
					>
						Usuários
					</Link>
					<Link
						to="/books"
						className="ml-4 hover:text-gray-300"
						onClick={clearTable}
					>
						Livros
					</Link>
					<Link
						to="/loans"
						className="ml-4 hover:text-gray-300"
						onClick={clearTable}
					>
						Empréstimos
					</Link>
				</div>
				<div className="flex">
					<Link
						to="/"
						className="ml-4 hover:text-gray-300"
						onClick={clearTable}
					>
						Sobre
					</Link>
				</div>
			</div>
		</nav>
	);
}
		