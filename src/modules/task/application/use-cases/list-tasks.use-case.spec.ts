import { mockTask } from '../../__test__/fixtures/mock-task';
import { InMemoryTasksRepository } from '../../__test__/repositories/in-memory-tasks.repository';
import { TaskStatus } from '../../domain/entities/task.entity';
import { ListTasksUseCase } from './list-tasks.use-case';

let sut: ListTasksUseCase;
let inMemoryTasksRepository: InMemoryTasksRepository;

describe('ListTasksUseCase', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    sut = new ListTasksUseCase(inMemoryTasksRepository);
  });

  it('should be able to list tasks', async () => {
    const createdTask = mockTask();
    await inMemoryTasksRepository.create(createdTask);

    const { tasks } = await sut.execute({
      userId: createdTask.userId,
    });

    expect(tasks.items).toHaveLength(1);
    expect(inMemoryTasksRepository.items).toHaveLength(1);
  });

  it('should be able to list tasks with pagination', async () => {
    const userId = 'user-id';

    for (let i = 0; i < 10; i += 1) {
      await inMemoryTasksRepository.create(mockTask({ userId }));
    }

    const { tasks } = await sut.execute({
      userId,
      page: 2,
      pageSize: 5,
    });

    expect(tasks.items).toHaveLength(5);
    expect(inMemoryTasksRepository.items).toHaveLength(10);
  });

  it('should be able to filter tasks', async () => {
    const userId = 'user-id';

    const createdTask = mockTask({ userId });
    await inMemoryTasksRepository.create(createdTask);

    const filteredTask = mockTask({
      userId,
      title: 'filtered-title',
      description: 'filtered-description',
      status: TaskStatus.DONE,
    });

    await inMemoryTasksRepository.create(filteredTask);

    const { tasks } = await sut.execute({
      userId,
      title: 'filtered-title',
      description: 'filtered-description',
      status: TaskStatus.DONE,
    });

    expect(tasks.items).toHaveLength(1);
    expect(tasks.items[0]).toEqual(filteredTask);
    expect(inMemoryTasksRepository.items).toHaveLength(2);
  });
});
