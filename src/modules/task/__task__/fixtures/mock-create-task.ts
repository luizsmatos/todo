import { faker } from '@faker-js/faker';

import { CreateTaskUseCaseInput } from '../../application/use-cases/create-task.use-case';

export const mockCreateTask = (
  override: Partial<CreateTaskUseCaseInput> = {},
): CreateTaskUseCaseInput => {
  return {
    userId: faker.string.uuid(),
    title: faker.lorem.text(),
    description: faker.lorem.text(),
    ...override,
  };
};
