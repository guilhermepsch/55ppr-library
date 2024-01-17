import { Loan } from '../models/Loan';
import { LoanFacade } from '../patterns/facade/LoanFacade';
import { Observer } from '../patterns/observer/Observer';
import { LoanView } from '../views/LoanView';

export default class LoanController implements Observer {
  private loanFacade: LoanFacade;
  private loanView: LoanView;

  constructor(loanFacade: LoanFacade) {
    this.loanFacade = loanFacade;
    this.loanView = new LoanView(
      this.loanFacade.list(),
      this.delete.bind(this),
      this.upsert.bind(this),
    );
    this.loanFacade.addObserver(this);
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
    if (loan.returnDate) {
      return this.loanFacade.returnBook(loan);
    }
    return this.loanFacade.loanBook(loan);
  }

  public delete(id: number) {
    return this.loanFacade.delete(id);
  }

  public list(): Loan[] {
    return this.loanFacade.list();
  }

  public getView(): LoanView {
    return this.loanView;
  }

  public updateFromObserver(): void {
    console.log('Updating loan view');
    this.loanView.updateTable(this.list());
  }
}