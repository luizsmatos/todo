import { User } from '../../domain/entities/user.entity';
import { UsersRepository } from '../../domain/repositories/users.repository';

export class InMemoryUsersRepository implements UsersRepository {
  items: User[] = [];

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
