import { Component } from "react";
import { PagesButton } from "../../interfaces/PagesButton";
import { Link } from "react-router-dom";

export class NetflixPagesButton extends Component implements PagesButton {
  renderButton(clearTable: () => void): JSX.Element {
    return (<><Link
      to="/users"
      className="ml-4 hover:text-red-300"
      onClick={clearTable}>
      Usuários
    </Link>
    <Link
      to="/books"
      className="ml-4 hover:text-red-300"
      onClick={clearTable}>
      Livros
    </Link>
    <Link
      to="/loans"
      className="ml-4 hover:text-red-300"
      onClick={clearTable}>
      Empréstimos
    </Link></>);
  }
}