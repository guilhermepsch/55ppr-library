import { User, UserRole } from '../models/User';
import { Observer } from '../patterns/observer/Observer';
import { UserRepository } from '../repositories/UserRepository';
import { UserView } from '../views/UserView';

export default class UserController implements Observer {

  private userRepository: UserRepository;
  private userView: UserView;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
    this.userView = new UserView(
      this.userRepository.list(),
      this.delete.bind(this),
      this.upsert.bind(this),
    );
    this.userRepository.addObserver(this);
  }

  public upsert(
    id: number,
    name: string,
    email: string,
    role: string,
  ) {
    if (Number.isNaN(id) || id == undefined) {
      id = 0;
    }
    if (name == undefined) {
      throw new Error('Name is required');
    }
    if (email == undefined) {
      throw new Error('Email is required');
    }
    if (role == undefined) {
      throw new Error('Role is required');
    }
    const user = new User(
      id,
      name,
      email,
      role as UserRole,
    );
    return this.userRepository.upsert(user);
  }

  public delete(id: number) {
    return this.userRepository.delete(id);
  }

  public list(): User[] {
    return this.userRepository.list();
  }

  public getView(): UserView {
    return this.userView;
  }

  public updateFromObserver(): void {
    console.log('Updating user view');
		this.userView.updateTable(this.list());
  }
}