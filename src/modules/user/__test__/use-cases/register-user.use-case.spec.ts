import bcrypt from 'bcryptjs';

import {
  RegisterUserUseCase,
  RegisterUserUseCaseInput,
} from '../../application/use-cases/register-user.use-case';
import { UserAlreadyExistsException } from '../../domain/exceptions/user-already-exists.exception';
import { InMemoryUsersRepository } from '../repositories/in-memory-users.repository';

vitest.mock('bcryptjs');

let sut: RegisterUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe('RegisterUserUseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new RegisterUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to register a new user', async () => {
    const mockUser: RegisterUserUseCaseInput = {
      name: 'John Doe',
      email: 'Ttqgj@example.com',
      password: '123456',
    };

    const { user } = await sut.execute(mockUser);

    const hashedPassword = await bcrypt.hash(mockUser.password, 10);

    expect(user).toEqual({
      id: expect.any(String) as string,
      name: mockUser.name,
      email: mockUser.email,
      password: hashedPassword,
      createdAt: expect.any(Date) as Date,
      updatedAt: null,
    });
    expect(bcrypt.hash).toHaveBeenCalledWith(mockUser.password, 10);
    expect(inMemoryUsersRepository.items).toHaveLength(1);
  });

  it('should not be able to register a new user with the same email', async () => {
    const mockUser: RegisterUserUseCaseInput = {
      name: 'John Doe',
      email: 'Ttqgj@example.com',
      password: '123456',
    };

    await sut.execute(mockUser);

    await expect(sut.execute(mockUser)).rejects.toEqual(
      new UserAlreadyExistsException(mockUser.email),
    );
  });
});
