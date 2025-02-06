import { Task } from '../entities/task.entity';

export interface TasksRepository {
  create(task: Task): Promise<void>;
  findByTitle(title: string): Promise<Task | null>;
  findById(id: string): Promise<Task | null>;
  update(task: Task): Promise<void>;
  delete(id: string): Promise<void>;
}
