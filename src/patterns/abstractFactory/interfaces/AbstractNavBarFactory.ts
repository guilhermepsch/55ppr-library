import { AboutButton } from "./AboutButton";
import { LibraryButton } from "./LibraryButton";
import { NavBarColor } from "./NavBarColor";
import { PagesButton } from "./PagesButton";

export interface AbstractNavBarFactory {
  createLibraryButton(): LibraryButton;
  createPagesButton(): PagesButton;
  createAboutButton(): AboutButton;
  createNavBarColor(): NavBarColor;
}
