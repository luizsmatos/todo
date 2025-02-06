import { Module } from '@nestjs/common';

import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { TasksPersistenceModule } from '../persistence/tasks-persistence.module';
import { CreateTaskController } from './controllers/create-task.controller';

@Module({
  imports: [TasksPersistenceModule],
  controllers: [CreateTaskController],
  providers: [CreateTaskUseCase],
})
export class TasksHttpModule {}
