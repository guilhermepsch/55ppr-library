import { ArrowClockwise } from '@phosphor-icons/react';
import NavBar from '../components/NavBar';
import { Loan } from '../models/Loan';
import { BookView } from './BookView';
import { UserView } from './UserView';

export class LoanView {
	loans: Loan[];
	handleDelete: (id: number) => void;
	handleSave: (
		id: number,
		bookId: number,
		userId: number,
		loanDate: Date,
		returnDate?: Date,
	) => void;

	constructor(
		loans: Loan[],
		handleDelete: (id: number) => void,
		handleSave: (
			id: number,
			bookId: number,
			userId: number,
			loanDate: Date,
			returnDate?: Date,
		) => void,
	) {
		this.loans = loans;
		this.handleDelete = handleDelete;
		this.handleSave = handleSave;
	}

	public updateTable(loans: Loan[]) {
		this.loans = loans;
		const tbody = document.getElementById('loan-tbody');
		if (!tbody) return;
		tbody.innerHTML = '';
		loans.forEach(loan => {
			tbody.appendChild(this.createLoanRow(loan));
		});
	}

	public loadTable() {
		const tbody = document.getElementById('loan-tbody');
		if (!tbody) return;
    tbody.innerHTML = '';
		this.loans.forEach(loan => {
			tbody.appendChild(this.createLoanRow(loan));
		});
	}

	public clearTable() {
		const tbody = document.getElementById('loan-tbody');
		if (!tbody) return;
		tbody.innerHTML = '';
	}

	public edit(id: number) {
		const loan = this.loans.find(loan => loan.id === id);
		if (!loan) return;
		this.getFormFieldId().value = loan.id.toString();
		this.getFormFieldBookId().value = loan.bookId.toString();
		this.getFormFieldUserId().value = loan.userId.toString();
		this.getFormFieldLoanDate().value = loan.loanDate
			.toISOString()
			.split('T')[0];
		this.getFormFieldReturnDate().value = loan.returnDate
			? loan.returnDate.toISOString().split('T')[0]
			: '';
	}

	public renderView(): JSX.Element {
		const bookView = new BookView(
			[],
			() => {},
			() => {},
		);
		bookView.clearTable();
		const userView = new UserView(
			[],
			() => {},
			() => {},
		);
		userView.clearTable();
		return (
			<>
				<NavBar clearTable={this.clearTable.bind(this)} />
				<div className="w-full flex items-center flex-col">
					{this.getLoanForm()}
					<h2 className="text-3xl font-bold mb-4">Loan List</h2>
					<button
						className="bg-purple-500 hover:bg-purple-700 rounded-full text-white font-bold w-10 h-10 flex items-center justify-center focus:outline-none focus:shadow-outline"
						onClick={e => {
							e.preventDefault();
							this.loadTable();
						}}>
						<ArrowClockwise />
					</button>
					<table
						className="min-w-full divide-y divide-gray-200"
						id="loan-table">
						<thead>
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Book ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									User ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Loan Date
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Return Date
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Action
								</th>
							</tr>
						</thead>
						<tbody id="loan-tbody"></tbody>
					</table>
				</div>
			</>
		);
	}

	public createLoanRow(loan: Loan) {
		const row = document.createElement('tr');

		const idCell = document.createElement('td');
		idCell.textContent = loan.id.toString();
		idCell.classList.add('px-6', 'py-4', 'whitespace-nowrap');

		const bookIdCell = document.createElement('td');
		bookIdCell.textContent = loan.bookId.toString();
		bookIdCell.classList.add('px-6', 'py-4', 'whitespace-nowrap');

		const userIdCell = document.createElement('td');
		userIdCell.textContent = loan.userId.toString();
		userIdCell.classList.add('px-6', 'py-4', 'whitespace-nowrap');

		const loanDateCell = document.createElement('td');
		loanDateCell.textContent = loan.loanDate.toISOString().split('T')[0];
		loanDateCell.classList.add('px-6', 'py-4', 'whitespace-nowrap');

		const returnDateCell = document.createElement('td');
		returnDateCell.textContent = loan.returnDate
			? loan.returnDate.toISOString().split('T')[0]
			: '';
		returnDateCell.classList.add('px-6', 'py-4', 'whitespace-nowrap');

		const deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.classList.add(
			'px-4',
			'py-1',
			'font-semibold',
			'text-red-500',
			'bg-transparent',
			'border',
			'border-red-500',
			'rounded',
			'hover:bg-red-500',
			'hover:text-white',
			'hover:border-transparent',
			'transition',
			'duration-300',
			'ease-in-out',
		);
		deleteButton.addEventListener('click', () => {
			this.handleDelete(loan.id);
		});

		const editButton = document.createElement('button');
		editButton.textContent = 'Edit';
		editButton.classList.add(
			'px-4',
			'py-1',
			'font-semibold',
			'text-blue-500',
			'bg-transparent',
			'border',
			'border-blue-500',
			'rounded',
			'hover:bg-blue-500',
			'hover:text-white',
			'hover:border-transparent',
			'transition',
			'duration-300',
			'ease-in-out',
		);
		editButton.addEventListener('click', () => {
			this.edit(loan.id);
		});

		const actionsCell = document.createElement('td');
		actionsCell.classList.add(
			'px-6',
			'py-4',
			'whitespace-nowrap',
			'flex',
			'gap-3',
		);
		actionsCell.appendChild(deleteButton);
		actionsCell.appendChild(editButton);

		row.appendChild(idCell);
		row.appendChild(bookIdCell);
		row.appendChild(userIdCell);
		row.appendChild(loanDateCell);
		row.appendChild(returnDateCell);
		row.appendChild(actionsCell);

		return row;
	}

	public getLoanForm() {
		return (
			<div className="w-full flex items-center flex-col">
				<h2 className="text-3xl font-bold mb-4">Add Loan</h2>
				<form id="loan-form" className="w-full max-w-lg">
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full px-3 mb-6">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="id">
								ID
							</label>
							<input
								id="id"
								name="id"
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
								type="number"
								placeholder="ID"
								disabled
							/>
						</div>
						<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="bookId">
								Book ID
							</label>
							<input
								id="bookId"
								name="bookId"
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								type="number"
								placeholder="Book ID"
							/>
						</div>
						<div className="w-full md:w-1/2 px-3">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="userId">
								User ID
							</label>
							<input
								id="userId"
								name="userId"
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
								type="number"
								placeholder="User ID"
							/>
						</div>
					</div>
					<div className="flex flex-wrap -mx-3 mb-2">
						<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="loanDate">
								Loan Date
							</label>
							<input
								id="loanDate"
								name="loanDate"
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								type="date"
								placeholder="Loan Date"
							/>
						</div>
						<div className="w-full md:w-1/2 px-3">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="returnDate">
								Return Date
							</label>
							<input
								id="returnDate"
								name="returnDate"
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								type="date"
								placeholder="Return Date (Optional)"
							/>
						</div>
					</div>
					<div className="flex flex-wrap -mx-3 mb-2">
						<div className="w-full flex flex-row justify-between gap-10 mx-3">
							<button
								type="submit"
								className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								onClick={e => {
									e.preventDefault();
									this.handleSave(
										parseInt(this.getFormFieldId().value),
										parseInt(
											this.getFormFieldBookId().value,
										),
										parseInt(
											this.getFormFieldUserId().value,
										),
										new Date(
											this.getFormFieldLoanDate().value,
										),
										this.getFormFieldReturnDate().value
											? new Date(
													this.getFormFieldReturnDate().value,
											  )
											: undefined,
									);
									this.resetForm();
								}}>
								Save
							</button>
							<button
								type="button"
								className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								onClick={e => {
									e.preventDefault();
									this.resetForm();
								}}>
								Reset
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}

	public getFormFieldId() {
		return document.getElementById('id') as HTMLInputElement;
	}

	public getFormFieldBookId() {
		return document.getElementById('bookId') as HTMLInputElement;
	}

	public getFormFieldUserId() {
		return document.getElementById('userId') as HTMLInputElement;
	}

	public getFormFieldLoanDate() {
		return document.getElementById('loanDate') as HTMLInputElement;
	}

	public getFormFieldReturnDate() {
		return document.getElementById('returnDate') as HTMLInputElement;
	}

	public getForm() {
		return document.getElementById('loan-form') as HTMLFormElement;
	}

	public resetForm() {
		this.getForm().reset();
	}
}
