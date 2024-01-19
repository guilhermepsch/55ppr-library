import { Component } from 'react';
import { LibraryButton } from '../../interfaces/LibraryButton';
import { Link } from 'react-router-dom';

export class NetflixLibraryButton extends Component implements LibraryButton {
	renderButton(clearTable: () => void): JSX.Element {
		return (
			<Link
				to="/"
				className="text-2xl font-bold hover:text-red-300"
				onClick={clearTable}>
				Biblioteca
			</Link>
		);
	}
}
