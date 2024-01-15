import { User } from "../models/User";
import { Observable } from "../patterns/observer/Observable";
import { Repository } from "./Repository";

export class UserRepository extends Observable implements Repository<User> {
  private users: User[] = [];
  private static instance: UserRepository;
	private id: number = 1;

  public save(user: User): User {
    user.id = this.id++;
    this.users.push(user);
    this.notifyObservers();
    return user;
  }

  public upsert(user: User): User {
    if (user.id == 0 || user.id == undefined) {
      return this.save(user);
    }
    return this.update(user);
  }

  public update(user: User): User {
    const previousUser = this.findById(user.id);
    if (!previousUser) {
      throw new Error("User not found");
    }
    const index = this.users.findIndex(item => item.id === user.id);
    this.users[index] = user;
    this.notifyObservers();
    return user;
  }

  public delete(id: number): void {
    const index = this.users.findIndex(item => item.id === id);
    this.users.splice(index, 1);
    this.notifyObservers();
  }

  public findById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  public findByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  public list(): User[] {
    return this.users;
  }

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }
}