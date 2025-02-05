import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';

import { User } from '../../domain/entities/user.entity';
import { UserAlreadyExistsException } from '../../domain/exceptions/user-already-exists.exception';
import { UsersRepository } from '../../domain/repositories/users.repository';

export interface RegisterUserUseCaseInput {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserUseCaseOutput {
  user: User;
}

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseInput): Promise<RegisterUserUseCaseOutput> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsException(email);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.create(user);

    return { user };
  }
}
