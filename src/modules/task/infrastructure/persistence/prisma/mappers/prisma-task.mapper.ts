import { Prisma, Task as PrismaTask } from '@prisma/client';
import { Task } from '@src/modules/task/domain/entities/task.entity';

export class PrismaTaskMapper {
  static toPrisma(task: Task): Prisma.TaskUncheckedCreateInput {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status.toString(),
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  static toDomain(raw: PrismaTask): Task {
    return new Task(
      {
        title: raw.title,
        description: raw.description,
        status: Task.validateStatus(raw.status),
        userId: raw.userId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }
}
