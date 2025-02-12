import { faker } from '@faker-js/faker';

import { User } from '../../domain/entities/user.entity';

export const mockUser = (override: Partial<User> = {}): User => {
  const id = override.id ?? faker.string.uuid();

  return new User(
    {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: faker.date.past(),
      updatedAt: null,
      ...override,
    },
    id,
  );
};
