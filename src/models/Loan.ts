export class Loan {
  id: number;
  bookId: number;
  userId: number;
  loanDate: Date;
  returnDate?: Date;

  constructor(id: number, bookId: number, userId: number, loanDate: Date, returnDate?: Date) {
    this.id = id;
    this.bookId = bookId;
    this.userId = userId;
    this.loanDate = loanDate;
    this.returnDate = returnDate;
  }
}
