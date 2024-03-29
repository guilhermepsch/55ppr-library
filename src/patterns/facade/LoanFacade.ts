import LoanController from "../../controllers/LoanController"
import { Loan } from "../../models/Loan"
import { BookRepository } from "../../repositories/BookRepository"
import { LoanRepository } from "../../repositories/LoanRepository"
import { UserRepository } from "../../repositories/UserRepository"

export class LoanFacade {

  private loanRepository : LoanRepository
  private bookRepository : BookRepository
  private userRepository : UserRepository

  constructor (loanRepository : LoanRepository, bookRepository : BookRepository, userRepository: UserRepository) {
    this.loanRepository = loanRepository
    this.bookRepository = bookRepository
    this.userRepository = userRepository
  }

  public loanBook (loan: Loan) {
    const book = this.bookRepository.findById(loan.bookId)
    const user = this.userRepository.findById(loan.userId)
    if (!book || !user) {
      alert('Livro ou usuário não encontrado')
      return
    }
    const existingLoans = this.loanRepository.findByUserId(user.id)
    for (const existingLoan of existingLoans) {
      if (!existingLoan.returnDate) {
        alert('Usuário tem livro para devolver')
        return
      }
      if (existingLoan.returnDate > new Date()) {
        alert('Usuário tem livro para devolver')
        return
      }
      if (existingLoan.bookId === book.id) {
        alert('Usuário já tem esse livro')
        return
      }
    }
    if (book.availableCopies <= 0) {
      alert('Livro não disponível')
      return
    }
    if (!book.isAvailable) {
      alert('Livro não disponível')
      return
    }
    book.availableCopies--
    this.bookRepository.upsert(book)
    this.loanRepository.upsert(loan)
  }

  public returnBook (loan: Loan) {
    const existingLoan = this.loanRepository.findById(loan.id)
    if (!existingLoan) {
      return
    }
    existingLoan.returnDate = new Date()
    const book = this.bookRepository.findById(existingLoan.bookId)
    if (!book) {
      return
    }
    book.availableCopies++
    this.bookRepository.upsert(book)
    this.loanRepository.upsert(existingLoan)
  }

  public delete (id: number) {
    const loan = this.loanRepository.findById(id)
    if (!loan) {
      return
    }
    const book = this.bookRepository.findById(loan.bookId)
    if (!book) {
      return
    }
    book.availableCopies++
    this.bookRepository.upsert(book)
    this.loanRepository.delete(id)
  }

  public list (): Loan[] {
    return this.loanRepository.list()
  }

  public addObserver (controller: LoanController) {
    this.loanRepository.addObserver(controller)
  }

}