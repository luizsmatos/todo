import { ResourceNotFoundException } from '@src/shared/domain/exceptions/resource-not-found.exception';

import { mockUser } from '../../__test__/fixtures/mock-user';
import { InMemoryUsersRepository } from '../../__test__/repositories/in-memory-users.repository';
import { GetProfileUseCase } from './get-profile.use-case';

let sut: GetProfileUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe('GetProfileUseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new GetProfileUseCase(inMemoryUsersRepository);
  });

  it('should be able to get a user profile', async () => {
    const userId = 'user_id';
    const createdUser = mockUser({ id: userId });
    await inMemoryUsersRepository.create(createdUser);

    const { user } = await sut.execute({ userId });

    expect(user).toEqual(createdUser);
    expect(inMemoryUsersRepository.items).toHaveLength(1);
  });

  it('should not be able to get a user profile with an invalid user id', async () => {
    const userId = 'invalid_user_id';

    await expect(sut.execute({ userId })).rejects.toEqual(
      new ResourceNotFoundException(),
    );
  });
});
