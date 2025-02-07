import { NotAllowedException } from '@shared/domain/exceptions/not-allowed.exception';
import { ResourceNotFoundException } from '@shared/domain/exceptions/resource-not-found.exception';

import { mockTask } from '../../__test__/fixtures/mock-task';
import { mockUpdateTask } from '../../__test__/fixtures/mock-update-task';
import { InMemoryTasksRepository } from '../../__test__/repositories/in-memory-tasks.repository';
import { TaskAlreadyExistsException } from '../../domain/exceptions/task-already-exists.exception';
import { UpdateTaskUseCase } from './update-task.use-case';

let sut: UpdateTaskUseCase;
let inMemoryTasksRepository: InMemoryTasksRepository;

describe('UpdateTaskUseCase', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    sut = new UpdateTaskUseCase(inMemoryTasksRepository);
  });

  it('should be able to update a task', async () => {
    const createdTask = mockTask();

    inMemoryTasksRepository.items.push(createdTask);

    const updateTask = mockUpdateTask({
      taskId: createdTask.id,
      userId: createdTask.userId,
    });

    const { task } = await sut.execute(updateTask);

    expect(task).toEqual({
      id: expect.any(String) as string,
      title: updateTask.title,
      description: updateTask.description,
      status: updateTask.status,
      userId: updateTask.userId,
      createdAt: expect.any(Date) as Date,
      updatedAt: expect.any(Date) as Date,
    });
    expect(inMemoryTasksRepository.items).toHaveLength(1);
  });

  it('should not be able to update a task if there is already one with the same title', async () => {
    const userId = 'user-id';

    const createdTask = mockTask({ userId });
    inMemoryTasksRepository.items.push(createdTask);

    const createdConflictTask = mockTask({ userId });
    inMemoryTasksRepository.items.push(createdConflictTask);

    const updateTask = mockUpdateTask({
      taskId: createdTask.id,
      userId: createdTask.userId,
      title: createdConflictTask.title,
    });

    await expect(sut.execute(updateTask)).rejects.toEqual(
      new TaskAlreadyExistsException(updateTask.title),
    );
  });

  it('should not be able to update a task that does not exist', async () => {
    const updateTask = mockUpdateTask({
      taskId: 'task-id',
      userId: 'user-id',
    });

    await expect(sut.execute(updateTask)).rejects.toEqual(
      new ResourceNotFoundException(),
    );
  });

  it('should not be able to update a task that does not belong to the user', async () => {
    const createdTask = mockTask();

    inMemoryTasksRepository.items.push(createdTask);

    const updateTask = mockUpdateTask({
      taskId: createdTask.id,
      userId: 'user-id',
    });

    await expect(sut.execute(updateTask)).rejects.toEqual(
      new NotAllowedException(),
    );
  });
});
