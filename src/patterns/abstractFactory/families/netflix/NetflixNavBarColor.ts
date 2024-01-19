import { NavBarColor } from "../../interfaces/NavBarColor";

export class NetflixNavBarColor implements NavBarColor {
  getColor () {
    return 'red';
  }
}