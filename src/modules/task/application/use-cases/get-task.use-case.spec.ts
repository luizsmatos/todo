import { NotAllowedException } from '@shared/domain/exceptions/not-allowed.exception';
import { ResourceNotFoundException } from '@shared/domain/exceptions/resource-not-found.exception';

import { mockTask } from '../../__test__/fixtures/mock-task';
import { InMemoryTasksRepository } from '../../__test__/repositories/in-memory-tasks.repository';
import { GetTaskUseCase } from './get-task.use-case';

let sut: GetTaskUseCase;
let inMemoryTasksRepository: InMemoryTasksRepository;

describe('GetTaskUseCase', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    sut = new GetTaskUseCase(inMemoryTasksRepository);
  });

  it('should be able to get a task', async () => {
    const createdTask = mockTask();
    await inMemoryTasksRepository.create(createdTask);

    const { task } = await sut.execute({
      userId: createdTask.userId,
      taskId: createdTask.id,
    });

    expect(task).toEqual(createdTask);
    expect(inMemoryTasksRepository.items).toHaveLength(1);
  });

  it('should not be able to get a task from another user', async () => {
    const createdTask = mockTask();
    await inMemoryTasksRepository.create(createdTask);

    await expect(() =>
      sut.execute({
        userId: 'other-user-id',
        taskId: createdTask.id,
      }),
    ).rejects.toEqual(new NotAllowedException());
  });

  it('should not be able to get a task that does not exist', async () => {
    await expect(() =>
      sut.execute({
        userId: 'user-id',
        taskId: 'task-id',
      }),
    ).rejects.toEqual(new ResourceNotFoundException());
  });
});
