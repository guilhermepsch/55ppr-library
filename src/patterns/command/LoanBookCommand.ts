import { Loan } from '../../models/Loan';
import { LoanFacade } from '../facade/LoanFacade';
import { Command } from './Command';

export class LoanBookCommand implements Command {
	constructor(private loanFacade: LoanFacade, private loan: Loan) {}

	execute(): void {
		this.loanFacade.loanBook(this.loan);
	}
}
