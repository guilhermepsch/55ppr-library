export class Loan {
  id: number;
  bookId: string;
  userId: string;
  loanDate: Date;
  returnDate?: Date;

  constructor(id: number, bookId: string, userId: string, loanDate: Date, returnDate?: Date) {
    this.id = id;
    this.bookId = bookId;
    this.userId = userId;
    this.loanDate = loanDate;
    this.returnDate = returnDate;
  }
}
