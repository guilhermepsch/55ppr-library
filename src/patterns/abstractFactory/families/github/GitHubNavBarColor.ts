import { NavBarColor } from "../../interfaces/NavBarColor";

export class GitHubNavBarColor implements NavBarColor {
  getColor () {
    return 'gray';
  }
}