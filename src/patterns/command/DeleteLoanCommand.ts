import { LoanFacade } from '../facade/LoanFacade';
import { Command } from './Command';

export class DeleteLoanCommand implements Command {
	constructor(private loanFacade: LoanFacade, private id: number) {}

	execute(): void {
		this.loanFacade.delete(this.id);
	}
}
