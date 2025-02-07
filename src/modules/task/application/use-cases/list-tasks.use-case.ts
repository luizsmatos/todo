import { Injectable } from '@nestjs/common';
import { Pagination, PaginationParams } from '@shared/utils/pagination';

import { Task, TaskStatus } from '../../domain/entities/task.entity';
import { TasksRepository } from '../../domain/repositories/tasks.repository';

export interface ListTasksUseCaseInput extends Partial<PaginationParams> {
  userId: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface ListTasksUseCaseOutput {
  tasks: Pagination<Task>;
}

@Injectable()
export class ListTasksUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({
    userId,
    title,
    description,
    status,
    page = 1,
    pageSize = 10,
  }: ListTasksUseCaseInput): Promise<ListTasksUseCaseOutput> {
    const tasks = await this.tasksRepository.findManyByUserId(userId, {
      filters: { title, description, status },
      pagination: { page, pageSize },
    });

    return { tasks };
  }
}
