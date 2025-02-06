import { faker } from '@faker-js/faker';

import { Task, TaskStatus } from '../../domain/entities/task.entity';

export const mockTask = (override: Partial<Task> = {}): Task => {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.text(),
    description: faker.lorem.text(),
    status: faker.helpers.arrayElement(Object.values(TaskStatus)),
    userId: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: null,
    ...override,
  };
};
