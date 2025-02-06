import crypto from 'node:crypto';

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class Task {
  id: string;
  title: string;
  description: string;
  userId: string;
  status: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date | null;

  constructor(task: Omit<Task, 'id'>, id?: string) {
    this.id = id ?? crypto.randomUUID();
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
    this.userId = task.userId;
    this.createdAt = task.createdAt ?? new Date();
    this.updatedAt = task.updatedAt ?? null;
  }

  static validateStatus(status: string) {
    if (!Object.values(TaskStatus).includes(status as TaskStatus)) {
      throw new Error(`Invalid status: ${status}`);
    }

    return status as TaskStatus;
  }
}
