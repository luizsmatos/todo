import { Task } from '../../domain/entities/task.entity';
import { TasksRepository } from '../../domain/repositories/tasks.repository';

export class InMemoryTasksRepository implements TasksRepository {
  items: Task[] = [];

  async create(task: Task): Promise<void> {
    this.items.push(task);
  }

  async findByTitle(title: string): Promise<Task | null> {
    const task = this.items.find((task) => task.title === title);

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
}
