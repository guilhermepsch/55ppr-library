import { Component } from 'react';
import { AboutButton } from '../../interfaces/AboutButton';
import { Link } from 'react-router-dom';

export class NetflixAboutButton extends Component implements AboutButton {
	renderButton(clearTable: () => void): JSX.Element {
		return (
			<div className="flex">
				<Link
					to="/"
					className="ml-4 hover:text-red-300"
					onClick={clearTable}>
					Sobre
				</Link>
			</div>
		);
	}
}
