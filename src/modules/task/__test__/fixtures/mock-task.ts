import { faker } from '@faker-js/faker';

import { Task, TaskStatus } from '../../domain/entities/task.entity';

export const mockTask = (override: Partial<Task> = {}): Task => {
  return new Task(
    {
      title: faker.lorem.text(),
      description: faker.lorem.text(),
      status: faker.helpers.arrayElement(Object.values(TaskStatus)),
      userId: faker.string.uuid(),
      ...override,
    },
    faker.string.uuid(),
  );
};
