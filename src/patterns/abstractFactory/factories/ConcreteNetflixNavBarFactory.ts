import { NetflixAboutButton } from "../families/netflix/NetflixAboutButton";
import { NetflixLibraryButton } from "../families/netflix/NetflixLibraryButton";
import { NetflixNavBarColor } from "../families/netflix/NetflixNavBarColor";
import { NetflixPagesButton } from "../families/netflix/NetflixPagesButton";
import { AbstractNavBarFactory } from "../interfaces/AbstractNavBarFactory";

export class ConcreteNetflixNavBarFactory implements AbstractNavBarFactory {

    createLibraryButton() {
        return new NetflixLibraryButton({});
    }
    createPagesButton() {
        return new NetflixPagesButton({});
    }
    createAboutButton() {
        return new NetflixAboutButton({});
    }
    createNavBarColor() {
        return new NetflixNavBarColor();
    }
}