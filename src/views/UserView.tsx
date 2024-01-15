import { ArrowClockwise } from '@phosphor-icons/react';
import NavBar from '../components/NavBar';
import { User, UserRole } from '../models/User';
import { BookView } from './BookView';
import { LoanView } from './LoanView';

export class UserView {
	users: User[];
	handleDelete: (id: number) => void;
	handleSave: (
		id: number,
		name: string,
		email: string,
		role: UserRole,
	) => void;

	constructor(
		users: User[],
		handleDelete: (id: number) => void,
		handleSave: (
			id: number,
			name: string,
			email: string,
			role: UserRole,
		) => void,
	) {
		this.users = users;
		this.handleDelete = handleDelete;
		this.handleSave = handleSave;
	}

	public updateTable(users: User[]) {
		this.users = users;
		const tbody = document.getElementById('user-tbody');
		if (!tbody) return;
		tbody.innerHTML = '';
		users.forEach(user => {
			tbody.appendChild(this.createUserRow(user));
		});
	}

	public loadTable() {
		const tbody = document.getElementById('user-tbody');
		if (!tbody) return;
		tbody.innerHTML = '';
		this.users.forEach(user => {
			tbody.appendChild(this.createUserRow(user));
		});
	}

	public clearTable() {
		const tbody = document.getElementById('user-tbody');
		if (!tbody) return;
		tbody.innerHTML = '';
	}

	public edit(id: number) {
		const user = this.users.find(user => user.id === id);
		if (!user) return;
		this.getFormFieldId().value = user.id.toString();
		this.getFormFieldName().value = user.name;
		this.getFormFieldEmail().value = user.email;
		this.getFormFieldRole().value = user.role;
	}

	public renderView(): JSX.Element {
		const bookView = new BookView([], () => {}, () => {});
		bookView.clearTable();
		const loanView = new LoanView([], () => {}, () => {});
		loanView.clearTable();
		return (
			<>
				<NavBar clearTable={this.clearTable.bind(this)} />
				<div className="w-full flex items-center flex-col">
					{this.getUserForm()}
					<h2 className="text-3xl font-bold mb-4">User List</h2>
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
						id="user-table">
						<thead>
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Name
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Email
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Role
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Action
								</th>
							</tr>
						</thead>
						<tbody id="user-tbody"></tbody>
					</table>
				</div>
			</>
		);
	}

	public createUserRow(user: User) {
		const row = document.createElement('tr');

		const idCell = document.createElement('td');
		idCell.textContent = user.id.toString();
		idCell.classList.add('px-6', 'py-4', 'whitespace-nowrap');

		const nameCell = document.createElement('td');
		nameCell.textContent = user.name;
		nameCell.classList.add('px-6', 'py-4', 'whitespace-nowrap');

		const emailCell = document.createElement('td');
		emailCell.textContent = user.email;
		emailCell.classList.add('px-6', 'py-4', 'whitespace-nowrap');

		const roleCell = document.createElement('td');
		roleCell.textContent = user.role;
		roleCell.classList.add('px-6', 'py-4', 'whitespace-nowrap');

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
			this.handleDelete(user.id);
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
			this.edit(user.id);
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
		row.appendChild(nameCell);
		row.appendChild(emailCell);
		row.appendChild(roleCell);
		row.appendChild(actionsCell);

		return row;
	}

	public getUserForm() {
		return (
			<div className="w-full flex items-center flex-col">
				<h2 className="text-3xl font-bold mb-4">Add User</h2>
				<form id="user-form" className="w-full max-w-lg">
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
								htmlFor="name">
								Name
							</label>
							<input
								id="name"
								name="name"
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
								type="text"
								placeholder="Name"
							/>
						</div>
						<div className="w-full md:w-1/2 px-3">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="email">
								Email
							</label>
							<input
								id="email"
								name="email"
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
								type="email"
								placeholder="Email"
							/>
						</div>
					</div>
					<div className="flex flex-wrap -mx-3 mb-2">
						<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								htmlFor="role">
								Role
							</label>
							<select
								id="role"
								name="role"
								className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
								<option value={UserRole.NORMAL}>NORMAL</option>
								<option value={UserRole.ADMIN}>ADMIN</option>
							</select>
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
										this.getFormFieldName().value,
										this.getFormFieldEmail().value,
										this.getFormFieldRole()
											.value as UserRole,
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

	public getFormFieldName() {
		return document.getElementById('name') as HTMLInputElement;
	}

	public getFormFieldEmail() {
		return document.getElementById('email') as HTMLInputElement;
	}

	public getFormFieldRole() {
		return document.getElementById('role') as HTMLSelectElement;
	}

	public getForm() {
		return document.getElementById('user-form') as HTMLFormElement;
	}

	public resetForm() {
		this.getForm().reset();
	}
}
