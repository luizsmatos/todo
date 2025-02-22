import { Pagination, PaginationParams } from '@shared/utils/pagination';

import { Task, TaskStatus } from '../entities/task.entity';

export interface TaskFilters {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export abstract class TasksRepository {
  abstract create(task: Task): Promise<void>;
  abstract findByTitle(userId: string, title: string): Promise<Task | null>;
  abstract findById(id: string): Promise<Task | null>;
  abstract update(task: Task): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findManyByUserId(
    userId: string,
    options: { pagination: PaginationParams; filters: TaskFilters },
  ): Promise<Pagination<Task>>;
}
