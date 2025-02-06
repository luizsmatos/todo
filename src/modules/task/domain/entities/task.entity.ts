import crypto from 'node:crypto';

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class Task {
  id?: string;
  title: string;
  description: string;
  userId: string;
  status: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date | null;

  constructor(task: Task) {
    this.id = task.id ?? crypto.randomUUID();
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
    this.userId = task.userId;
    this.createdAt = task.createdAt ?? new Date();
    this.updatedAt = task.updatedAt ?? null;
  }
}
