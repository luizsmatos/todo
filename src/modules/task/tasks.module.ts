import { Module } from '@nestjs/common';

import { TasksHttpModule } from './infrastructure/http/tasks-http.module';
import { TasksPersistenceModule } from './infrastructure/persistence/tasks-persistence.module';

@Module({
  imports: [TasksPersistenceModule, TasksHttpModule],
  exports: [TasksPersistenceModule],
})
export class TasksModule {}
