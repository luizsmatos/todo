import { Task } from '../entities/task.entity';

export interface TasksRepository {
  create(task: Task): Promise<void>;
  findByTitle(title: string): Promise<Task | null>;
}
