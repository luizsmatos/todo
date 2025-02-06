import { ConflictException } from '@nestjs/common';

export class TaskAlreadyExistsException extends ConflictException {
  constructor(title: string) {
    super(`Task with title ${title} already exists`);
  }
}
