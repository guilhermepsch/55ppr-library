import { User } from "../models/User";

export class UserRepository {
  private users: User[] = [];

  public save(user: User): User {
    this.users.push(user);
    return user;
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
}