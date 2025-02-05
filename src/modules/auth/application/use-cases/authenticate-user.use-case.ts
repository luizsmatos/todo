import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from '../../../user/domain/repositories/users.repository';
import { WrongCredentialsException } from '../../domain/exceptions/wrong-credentials.exception';

export interface AuthenticateUserUseCaseInput {
  email: string;
  password: string;
}

interface AuthenticateUserUseCaseOutput {
  accessToken: string;
}

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseInput): Promise<AuthenticateUserUseCaseOutput> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new WrongCredentialsException();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new WrongCredentialsException();
    }

    const payload = {
      sub: user.id,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
