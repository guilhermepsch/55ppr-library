import { Loan } from "../../models/Loan";
import { LoanRepository } from "../../repositories/LoanRepository";
import { RepositoryCreator } from "./RepositoryCreator";

export class ConcreteLoanRepositoryCreator implements RepositoryCreator<Loan> {
    create(): LoanRepository {
        return LoanRepository.getInstance();
    }
}