import { NotAllowedException } from '@shared/domain/exceptions/not-allowed.exception';
import { ResourceNotFoundException } from '@shared/domain/exceptions/resource-not-found.exception';

import { Task, TaskStatus } from '../../domain/entities/task.entity';
import { TaskAlreadyExistsException } from '../../domain/exceptions/task-already-exists.exception';
import { TasksRepository } from '../../domain/repositories/tasks.repository';

export interface UpdateTaskUseCaseInput {
  userId: string;
  taskId: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface UpdateTaskUseCaseOutput {
  task: Task;
}

export class UpdateTaskUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({
    userId,
    taskId,
    title,
    description,
    status,
  }: UpdateTaskUseCaseInput): Promise<UpdateTaskUseCaseOutput> {
    const taskWithSameTitle = await this.tasksRepository.findByTitle(title);

    if (taskWithSameTitle && taskWithSameTitle.id !== taskId) {
      throw new TaskAlreadyExistsException(title);
    }

    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new ResourceNotFoundException();
    }

    if (task.userId !== userId) {
      throw new NotAllowedException();
    }

    const updatedTask = new Task({
      ...task,
      title,
      description,
      status,
      updatedAt: new Date(),
    });

    await this.tasksRepository.update(updatedTask);

    return { task: updatedTask };
  }
}
