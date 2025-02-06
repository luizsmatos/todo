import { Module } from '@nestjs/common';
import { PrismaService } from '@src/shared/infrastructure/persistence/prisma/prisma.service';

import { TasksRepository } from './../../domain/repositories/tasks.repository';
import { PrismaTasksRepository } from './prisma/prisma-tasks.repository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: TasksRepository,
      useClass: PrismaTasksRepository,
    },
  ],
  exports: [TasksRepository],
})
export class TasksPersistenceModule {}
