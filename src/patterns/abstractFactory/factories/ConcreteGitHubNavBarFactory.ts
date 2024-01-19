import { GitHubAboutButton } from "../families/github/GitHubAboutButton";
import { GitHubLibraryButton } from "../families/github/GitHubLibraryButton";
import { GitHubNavBarColor } from "../families/github/GitHubNavBarColor";
import { GitHubPagesButton } from "../families/github/GitHubPagesButton";
import { AbstractNavBarFactory } from "../interfaces/AbstractNavBarFactory";

export class CocreteGitHubNavBarFactory implements AbstractNavBarFactory {
    createLibraryButton() {
        return new GitHubLibraryButton({});
    }
    createPagesButton() {
        return new GitHubPagesButton({});
    }
    createAboutButton() {
        return new GitHubAboutButton({});
    }
    createNavBarColor() {
        return new GitHubNavBarColor();
    }
}