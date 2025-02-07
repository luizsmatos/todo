import { Pagination, PaginationParams } from '@shared/utils/pagination';

import { Task } from '../../domain/entities/task.entity';
import {
  TaskFilters,
  TasksRepository,
} from '../../domain/repositories/tasks.repository';

export class InMemoryTasksRepository implements TasksRepository {
  items: Task[] = [];

  async create(task: Task): Promise<void> {
    this.items.push(task);
  }

  async findByTitle(userId: string, title: string): Promise<Task | null> {
    const task = this.items.find(
      (task) => task.title === title && task.userId === userId,
    );

    if (!task) {
      return null;
    }

    return task;
  }

  async findById(id: string): Promise<Task | null> {
    const task = this.items.find((task) => task.id === id);

    if (!task) {
      return null;
    }

    return task;
  }

  async update(task: Task): Promise<void> {
    const taskIndex = this.items.findIndex((item) => item.id === task.id);

    this.items[taskIndex] = task;
  }

  async delete(id: string): Promise<void> {
    const taskIndex = this.items.findIndex((item) => item.id === id);

    this.items.splice(taskIndex, 1);
  }

  async findManyByUserId(
    userId: string,
    options: { pagination: PaginationParams; filters: TaskFilters },
  ): Promise<Pagination<Task>> {
    const { page, pageSize } = options.pagination;
    const { title, description, status } = options.filters;

    const items = this.items.filter((task) => {
      if (task.userId !== userId) return false;

      if (title && !task.title.toLowerCase().includes(title.toLowerCase())) {
        return false;
      }

      if (
        description &&
        !task.description.toLowerCase().includes(description.toLowerCase())
      ) {
        return false;
      }

      if (status && task.status !== status) return false;

      return true;
    });

    const paginatedItems = items.slice((page - 1) * pageSize, page * pageSize);

    return Pagination.create({
      items: paginatedItems,
      totalItems: this.items.length,
      page,
      pageSize,
    });
  }
}
