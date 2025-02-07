import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@shared/infrastructure/persistence/prisma/prisma.service';
import { Pagination, PaginationParams } from '@shared/utils/pagination';
import { Task } from '@src/modules/task/domain/entities/task.entity';
import {
  TaskFilters,
  TasksRepository,
} from '@src/modules/task/domain/repositories/tasks.repository';

import { PrismaTaskMapper } from './mappers/prisma-task.mapper';

@Injectable()
export class PrismaTasksRepository implements TasksRepository {
  private readonly prisma: PrismaService;
  private readonly model: PrismaService['task'];

  constructor(prismaService: PrismaService) {
    this.prisma = prismaService;
    this.model = prismaService.task;
  }

  async findByTitle(userId: string, title: string): Promise<Task | null> {
    const task = await this.model.findFirst({ where: { userId, title } });

    if (!task) {
      return null;
    }

    return PrismaTaskMapper.toDomain(task);
  }

  async findById(id: string): Promise<Task | null> {
    const task = await this.model.findFirst({ where: { id } });

    if (!task) {
      return null;
    }

    return PrismaTaskMapper.toDomain(task);
  }

  async update(task: Task): Promise<void> {
    const toPrisma = PrismaTaskMapper.toPrisma(task);

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

    const where = {
      userId,
      title: title
        ? { contains: title, mode: Prisma.QueryMode.insensitive }
        : undefined,
      description: description
        ? { contains: description, mode: Prisma.QueryMode.insensitive }
        : undefined,
      status: status ?? undefined,
    };

    const totalItems = this.model.count({
      where,
    });

    const tasks = this.model.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const [total, items] = await this.prisma.$transaction([totalItems, tasks]);

    return Pagination.create({
      items: items.map((task) => PrismaTaskMapper.toDomain(task)),
      totalItems: total,
      page,
      pageSize,
    });
  }

  async create(task: Task): Promise<void> {
    const toPrisma = PrismaTaskMapper.toPrisma(task);

    await this.model.create({ data: toPrisma });
  }
}
