import { RepositoryCreator } from "./RepositoryCreator";
import { UserRepository } from "../../repositories/UserRepository";
import { User } from "../../models/User";

export class ConcreteUserRepositoryCreator implements RepositoryCreator<User> {
    create(): UserRepository {
        return UserRepository.getInstance();
    }
}