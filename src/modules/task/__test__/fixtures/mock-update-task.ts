import { faker } from '@faker-js/faker';

import { UpdateTaskUseCaseInput } from '../../application/use-cases/update-task.use-case';
import { TaskStatus } from '../../domain/entities/task.entity';

export const mockUpdateTask = (
  override: Partial<UpdateTaskUseCaseInput> = {},
): UpdateTaskUseCaseInput => {
  return {
    userId: faker.string.uuid(),
    taskId: faker.string.uuid(),
    title: faker.lorem.text(),
    description: faker.lorem.text(),
    status: faker.helpers.arrayElement(Object.values(TaskStatus)),
    ...override,
  };
};
