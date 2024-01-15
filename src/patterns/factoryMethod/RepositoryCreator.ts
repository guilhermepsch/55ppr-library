import { Repository } from "../../repositories/Repository";

export interface RepositoryCreator<T> {
  create(): Repository<T>;
}