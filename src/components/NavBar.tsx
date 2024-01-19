import { Component } from 'react';
import { AbstractNavBarFactory } from '../patterns/abstractFactory/interfaces/AbstractNavBarFactory';

interface NavBarProps {
	navBarFactory: AbstractNavBarFactory;
	clearTable: () => void;
}

export class NavBar extends Component<NavBarProps> {
	private navBarFactory: AbstractNavBarFactory;
	private clearTable: () => void;

	constructor(props: NavBarProps) {
		super({ ...props });
		this.navBarFactory = props.navBarFactory;
		this.clearTable = props.clearTable;
	}

	render() {
		return (
			<nav
				className={' text-white p-4'}
				style={{
					backgroundColor: this.navBarFactory.createNavBarColor().getColor(),
				}}>
				<div className="flex justify-between">
					<div className="flex">
						{this.navBarFactory
							.createLibraryButton()
							.renderButton(this.clearTable)}
						{this.navBarFactory
							.createPagesButton()
							.renderButton(this.clearTable)}
					</div>
					{this.navBarFactory
						.createAboutButton()
						.renderButton(this.clearTable)}
				</div>
			</nav>
		);
	}
}
