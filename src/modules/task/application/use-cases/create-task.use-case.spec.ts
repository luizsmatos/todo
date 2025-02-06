import { mockCreateTask } from '../../__test__/fixtures/mock-create-task';
import { InMemoryTasksRepository } from '../../__test__/repositories/in-memory-tasks.repository';
import { TaskStatus } from '../../domain/entities/task.entity';
import { TaskAlreadyExistsException } from '../../domain/exceptions/task-already-exists.exception';
import { CreateTaskUseCase } from './create-task.use-case';

let sut: CreateTaskUseCase;
let inMemoryTasksRepository: InMemoryTasksRepository;

describe('CreateTaskUseCase', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    sut = new CreateTaskUseCase(inMemoryTasksRepository);
  });

  it('should be able to create a new task', async () => {
    const createTask = mockCreateTask();

    const { task } = await sut.execute(createTask);

    expect(task).toEqual({
      id: expect.any(String) as string,
      title: createTask.title,
      description: createTask.description,
      status: TaskStatus.PENDING,
      userId: createTask.userId,
      createdAt: expect.any(Date) as Date,
      updatedAt: null,
    });
    expect(inMemoryTasksRepository.items).toHaveLength(1);
  });

  it('should not be able to create a new task with the same title', async () => {
    const createTask = mockCreateTask();

    await sut.execute(createTask);

    await expect(sut.execute(createTask)).rejects.toEqual(
      new TaskAlreadyExistsException(createTask.title),
    );
  });
});
