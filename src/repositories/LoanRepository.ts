import { Loan } from "../models/Loan";
import { Observable } from "../patterns/observer/Observable";
import { Repository } from "./Repository";

export class LoanRepository extends Observable implements Repository<Loan> {

  private loans: Loan[] = [];
  private static instance: LoanRepository;
  private id: number = 1;

  public save(loan: Loan): Loan {
    loan.id = this.id++;
    this.loans.push(loan);
    this.notifyObservers();
    return loan;
  }

  public upsert(loan: Loan): Loan {
    if (loan.id == 0 || loan.id == undefined) {
      return this.save(loan);
    }
    return this.update(loan);
  }

  public update(loan: Loan): Loan {
    const previousLoan = this.findById(loan.id);
    if (!previousLoan) {
      throw new Error("Loan not found");
    }
    const index = this.loans.findIndex(item => item.id === loan.id);
    this.loans[index] = loan;
    this.notifyObservers();
    return loan;
  }

  public delete(id: number): void {
    const index = this.loans.findIndex(item => item.id === id);
    this.loans.splice(index, 1);
    this.notifyObservers();
  }

  public findById(id: number): Loan | undefined {
    return this.loans.find(loan => loan.id === id);
  }

  public findByUserId(userId: number): Loan[] {
    return this.loans.filter(loan => loan.userId === userId);
  }

  public findByBookId(bookId: number): Loan[] {
    return this.loans.filter(loan => loan.bookId === bookId);
  }

  public findByUserIdAndBookId(userId: number, bookId: number): Loan | undefined {
    return this.loans.find(loan => loan.userId === userId && loan.bookId === bookId);
  }

  public list(): Loan[] {
    return this.loans;
  }

  public static getInstance(): LoanRepository {
    if (!LoanRepository.instance) {
      LoanRepository.instance = new LoanRepository();
    }
    return LoanRepository.instance;
  }

}