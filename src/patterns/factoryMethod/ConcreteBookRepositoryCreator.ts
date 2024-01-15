import { Book } from "../../models/Book";
import { BookRepository } from "../../repositories/BookRepository";
import { RepositoryCreator } from "./RepositoryCreator";

export class ConcreteBookRepositoryCreator implements RepositoryCreator<Book> {
    create(): BookRepository {
        return BookRepository.getInstance();
    }
}