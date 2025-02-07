import { Module } from '@nestjs/common';

import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.use-case';
import { GetTaskUseCase } from '../../application/use-cases/get-task.use-case';
import { ListTasksUseCase } from '../../application/use-cases/list-tasks.use-case';
import { UpdateTaskUseCase } from '../../application/use-cases/update-task.use-case';
import { TasksPersistenceModule } from '../persistence/tasks-persistence.module';
import { CreateTaskController } from './controllers/create-task.controller';
import { DeleteTaskController } from './controllers/delete-task.controller';
import { GetTaskController } from './controllers/get-task.controller';
import { ListTasksController } from './controllers/list-tasks.controller';
import { UpdateTaskController } from './controllers/update-task.controller';

@Module({
  imports: [TasksPersistenceModule],
  controllers: [
    CreateTaskController,
    GetTaskController,
    DeleteTaskController,
    UpdateTaskController,
    ListTasksController,
  ],
  providers: [
    CreateTaskUseCase,
    GetTaskUseCase,
    DeleteTaskUseCase,
    UpdateTaskUseCase,
    ListTasksUseCase,
  ],
})
export class TasksHttpModule {}
