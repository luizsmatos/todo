import { User } from '../entities/user.entity';

export interface UsersRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
