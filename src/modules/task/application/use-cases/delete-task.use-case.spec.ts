import { NotAllowedException } from '@shared/domain/exceptions/not-allowed.exception';
import { ResourceNotFoundException } from '@shared/domain/exceptions/resource-not-found.exception';

import { mockTask } from '../../__test__/fixtures/mock-task';
import { InMemoryTasksRepository } from '../../__test__/repositories/in-memory-tasks.repository';
import { DeleteTaskUseCase } from './delete-task.use-case';

let sut: DeleteTaskUseCase;
let inMemoryTasksRepository: InMemoryTasksRepository;

describe('DeleteTaskUseCase', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    sut = new DeleteTaskUseCase(inMemoryTasksRepository);
  });

  it('should be able to delete a task', async () => {
    const createdTask = mockTask();
    inMemoryTasksRepository.items.push(createdTask);

    await sut.execute({
      taskId: createdTask.id,
      userId: createdTask.userId,
    });

    expect(inMemoryTasksRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a task that does not exist', async () => {
    await expect(
      sut.execute({
        taskId: 'not-existing-task-id',
        userId: 'user-id',
      }),
    ).rejects.toEqual(new ResourceNotFoundException());
  });

  it('should not be able to delete a task that does not belong to the user', async () => {
    const createdTask = mockTask();
    inMemoryTasksRepository.items.push(createdTask);

    await expect(
      sut.execute({
        userId: 'user-id',
        taskId: createdTask.id,
      }),
    ).rejects.toEqual(new NotAllowedException());
  });
});
