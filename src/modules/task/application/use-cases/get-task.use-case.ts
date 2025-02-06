import { Injectable } from '@nestjs/common';
import { NotAllowedException } from '@shared/domain/exceptions/not-allowed.exception';
import { ResourceNotFoundException } from '@shared/domain/exceptions/resource-not-found.exception';

import { Task } from '../../domain/entities/task.entity';
import { TasksRepository } from '../../domain/repositories/tasks.repository';

export interface GetTaskUseCaseInput {
  userId: string;
  taskId: string;
}

interface GetTaskUseCaseOutput {
  task: Task;
}

@Injectable()
export class GetTaskUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({
    userId,
    taskId,
  }: GetTaskUseCaseInput): Promise<GetTaskUseCaseOutput> {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new ResourceNotFoundException();
    }

    if (task.userId !== userId) {
      throw new NotAllowedException();
    }

    return { task };
  }
}
