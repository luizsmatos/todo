import {
  Pagination,
  PaginationParams,
} from '@shared/domain/value-objects/pagination';

import { Task, TaskStatus } from '../entities/task.entity';

export interface TaskFilters {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface TasksRepository {
  create(task: Task): Promise<void>;
  findByTitle(title: string): Promise<Task | null>;
  findById(id: string): Promise<Task | null>;
  update(task: Task): Promise<void>;
  delete(id: string): Promise<void>;
  findManyByUserId(
    userId: string,
    options: { pagination: PaginationParams; filters: TaskFilters },
  ): Promise<Pagination<Task>>;
}
