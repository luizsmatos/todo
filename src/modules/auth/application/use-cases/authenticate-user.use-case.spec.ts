import crypto from 'node:crypto';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { InMemoryUsersRepository } from '../../../user/__test__/repositories/in-memory-users.repository';
import { WrongCredentialsException } from '../../domain/exceptions/wrong-credentials.exception';
import {
  AuthenticateUserUseCase,
  AuthenticateUserUseCaseInput,
} from './authenticate-user.use-case';

vitest.mock('bcrypt');
vitest.mock('@nestjs/jwt');

let sut: AuthenticateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let jwtService: JwtService;

describe('AuthenticateUserUseCase', () => {
  beforeAll(async () => {
    vi.mocked(bcrypt.hash).mockImplementation(
      (password) => `hashed_${password as string}`,
    );

    vi.mocked(bcrypt.compare).mockImplementation(
      (password, hash) => hash === `hashed_${password as string}`,
    );

    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUsersRepository.items.push({
      id: crypto.randomUUID(),
      name: 'John Doe',
      email: 'Ttqgj@example.com',
      password: await bcrypt.hash('123456', 10),
    });
  });

  beforeEach(() => {
    jwtService = new JwtService({
      secret: 'secret',
    });

    sut = new AuthenticateUserUseCase(inMemoryUsersRepository, jwtService);
  });

  it('should be able to authenticate a user', async () => {
    const mockUser: AuthenticateUserUseCaseInput = {
      email: 'Ttqgj@example.com',
      password: '123456',
    };

    vi.spyOn(jwtService, 'signAsync').mockResolvedValue('any_token');

    const { accessToken } = await sut.execute(mockUser);

    expect(accessToken).toEqual(expect.any(String));
  });

  it('should not be able to authenticate a user with a wrong email', async () => {
    const mockUser: AuthenticateUserUseCaseInput = {
      email: 'wrong-email',
      password: '123456',
    };

    await expect(sut.execute(mockUser)).rejects.toEqual(
      new WrongCredentialsException(),
    );
  });

  it('should not be able to authenticate a user with a wrong password', async () => {
    const mockUser: AuthenticateUserUseCaseInput = {
      email: 'Ttqgj@example.com',
      password: 'wrong-password',
    };

    await expect(sut.execute(mockUser)).rejects.toEqual(
      new WrongCredentialsException(),
    );
    expect(bcrypt.compare).toHaveBeenCalled();
  });
});
