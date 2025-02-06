import { Module } from '@nestjs/common';

import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.use-case';
import { GetTaskUseCase } from '../../application/use-cases/get-task.use-case';
import { TasksPersistenceModule } from '../persistence/tasks-persistence.module';
import { CreateTaskController } from './controllers/create-task.controller';
import { DeleteTaskController } from './controllers/delete-task.controller';
import { GetTaskController } from './controllers/get-task.controller';

@Module({
  imports: [TasksPersistenceModule],
  controllers: [CreateTaskController, GetTaskController, DeleteTaskController],
  providers: [CreateTaskUseCase, GetTaskUseCase, DeleteTaskUseCase],
})
export class TasksHttpModule {}
