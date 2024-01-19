import { Loan } from '../models/Loan';
import { AbstractNavBarFactory } from '../patterns/abstractFactory/interfaces/AbstractNavBarFactory';
import { Command } from '../patterns/command/Command';
import { DeleteLoanCommand } from '../patterns/command/DeleteLoanCommand';
import { LoanBookCommand } from '../patterns/command/LoanBookCommand';
import { ReturnBookCommand } from '../patterns/command/ReturnBookCommand';
import { LoanFacade } from '../patterns/facade/LoanFacade';
import { Observer } from '../patterns/observer/Observer';
import { LoanView } from '../views/LoanView';

export default class LoanController implements Observer {
  private loanFacade: LoanFacade;
  private loanView: LoanView;

  constructor(loanFacade: LoanFacade, navBarFactory: AbstractNavBarFactory) {
    this.loanFacade = loanFacade;
    this.loanView = new LoanView(
      this.loanFacade.list(),
      this.executeDelete.bind(this),
      this.executeUpsert.bind(this),
      navBarFactory,
    );
    this.loanFacade.addObserver(this);
  }

  private executeUpsert(
    id: number,
    bookId: number,
    userId: number,
    loanDate: Date,
    returnDate?: Date
  ): void {
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
    const loan = new Loan(id, bookId, userId, loanDate, returnDate);

    const upsertCommand: Command =
      loan.returnDate != undefined
        ? new ReturnBookCommand(this.loanFacade, loan)
        : new LoanBookCommand(this.loanFacade, loan);

    upsertCommand.execute();
  }

  private executeDelete(id: number): void {
    const deleteCommand: Command = new DeleteLoanCommand(
      this.loanFacade,
      id
    );
    deleteCommand.execute();
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