import { NotAllowedException } from '@shared/domain/exceptions/not-allowed.exception';
import { ResourceNotFoundException } from '@shared/domain/exceptions/resource-not-found.exception';

import { TasksRepository } from '../../domain/repositories/tasks.repository';

export interface DeleteTaskUseCaseInput {
  userId: string;
  taskId: string;
}

export class DeleteTaskUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({ userId, taskId }: DeleteTaskUseCaseInput): Promise<void> {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new ResourceNotFoundException();
    }

    if (task.userId !== userId) {
      throw new NotAllowedException();
    }

    await this.tasksRepository.delete(taskId);
  }
}
