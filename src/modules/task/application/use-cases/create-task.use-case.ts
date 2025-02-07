import { Injectable } from '@nestjs/common';

import { Task, TaskStatus } from '../../domain/entities/task.entity';
import { TaskAlreadyExistsException } from '../../domain/exceptions/task-already-exists.exception';
import { TasksRepository } from '../../domain/repositories/tasks.repository';

export interface CreateTaskUseCaseInput {
  userId: string;
  title: string;
  description: string;
}

export interface CreateTaskUseCaseOutput {
  task: Task;
}

@Injectable()
export class CreateTaskUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({
    userId,
    title,
    description,
  }: CreateTaskUseCaseInput): Promise<CreateTaskUseCaseOutput> {
    const taskWithSameTitle = await this.tasksRepository.findByTitle(
      userId,
      title,
    );

    if (taskWithSameTitle) {
      throw new TaskAlreadyExistsException(title);
    }

    const task = new Task({
      userId,
      title,
      description,
      status: TaskStatus.PENDING,
    });

    await this.tasksRepository.create(task);

    return { task };
  }
}
