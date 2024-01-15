import { Loan } from '../models/Loan';
import { Observer } from '../patterns/observer/Observer';
import { LoanRepository } from '../repositories/LoanRepository';
import { LoanView } from '../views/LoanView';

export default class LoanController implements Observer {
  private loanRepository: LoanRepository;
  private loanView: LoanView;

  constructor(loanRepository: LoanRepository) {
    this.loanRepository = loanRepository;
    this.loanView = new LoanView(
      this.loanRepository.list(),
      this.delete.bind(this),
      this.upsert.bind(this),
    );
    this.loanRepository.addObserver(this);
  }

  public upsert(
    id: number,
    bookId: number,
    userId: number,
    loanDate: Date,
    returnDate?: Date,
  ) {
    if (Number.isNaN(id) || id == undefined) {
      id = 0;
    }
    if (Number.isNaN(bookId) || bookId == undefined) {
      throw new Error('Book ID is required');
    }
    if (Number.isNaN(userId) || userId == undefined) {
      throw new Error('User ID is required');
    }
    if (loanDate == undefined) {
      throw new Error('Loan Date is required');
    }
    const loan = new Loan(
      id,
      bookId,
      userId,
      loanDate,
      returnDate,
    );
    return this.loanRepository.upsert(loan);
  }

  public delete(id: number) {
    return this.loanRepository.delete(id);
  }

  public list(): Loan[] {
    return this.loanRepository.list();
  }

  public getView(): LoanView {
    return this.loanView;
  }

  public updateFromObserver(): void {
    console.log('Updating loan view');
    this.loanView.updateTable(this.list());
  }
}