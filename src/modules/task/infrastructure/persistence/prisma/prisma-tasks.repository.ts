import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  Pagination,
  PaginationParams,
} from '@shared/domain/value-objects/pagination';
import { PrismaService } from '@shared/infrastructure/persistence/prisma/prisma.service';
import { Task } from '@src/modules/task/domain/entities/task.entity';
import {
  TaskFilters,
  TasksRepository,
} from '@src/modules/task/domain/repositories/tasks.repository';

@Injectable()
export class PrismaTasksRepository implements TasksRepository {
  private readonly prisma: PrismaService;
  private readonly model: PrismaService['task'];

  constructor(prismaService: PrismaService) {
    this.prisma = prismaService;
    this.model = prismaService.task;
  }

  async findByTitle(title: string): Promise<Task | null> {
    const task = await this.model.findFirst({ where: { title } });

    if (!task) {
      return null;
    }

    return new Task(
      {
        title: task.title,
        description: task.description,
        status: Task.validateStatus(task.status),
        userId: task.userId,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      },
      task.id,
    );
  }

  async findById(id: string): Promise<Task | null> {
    const task = await this.model.findFirst({ where: { id } });

    if (!task) {
      return null;
    }

    return new Task(
      {
        title: task.title,
        description: task.description,
        status: Task.validateStatus(task.status),
        userId: task.userId,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      },
      task.id,
    );
  }

  async update(task: Task): Promise<void> {
    const toPrisma: Prisma.TaskUncheckedUpdateInput = {
      title: task.title,
      description: task.description,
      status: task.status.toString(),
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };

    await this.model.update({
      where: { id: task.id },
      data: toPrisma,
    });
  }

  async delete(id: string): Promise<void> {
    await this.model.delete({ where: { id } });
  }

  async findManyByUserId(
    userId: string,
    options: { pagination: PaginationParams; filters: TaskFilters },
  ): Promise<Pagination<Task>> {
    const { page, pageSize } = options.pagination;
    const { title, description, status } = options.filters;

    const totalItems = this.model.count({
      where: {
        userId,
        title: title ? { contains: title } : undefined,
        description: description ? { contains: description } : undefined,
        status: status ?? undefined,
      },
    });

    const tasks = this.model.findMany({
      where: {
        userId,
        title: title ? { contains: title } : undefined,
        description: description ? { contains: description } : undefined,
        status: status ?? undefined,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const [total, items] = await this.prisma.$transaction([totalItems, tasks]);

    return Pagination.create({
      items: items.map((task) => {
        return new Task(
          {
            title: task.title,
            description: task.description,
            status: Task.validateStatus(task.status),
            userId: task.userId,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
          },
          task.id,
        );
      }),
      totalItems: total,
      page,
      pageSize,
    });
  }

  async create(task: Task): Promise<void> {
    const toPrisma: Prisma.TaskUncheckedCreateInput = {
      title: task.title,
      description: task.description,
      status: task.status.toString(),
      userId: task.userId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };

    await this.model.create({ data: toPrisma });
  }
}
