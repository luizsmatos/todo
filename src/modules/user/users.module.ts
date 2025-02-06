import { Module } from '@nestjs/common';

import { UsersHttpModule } from './infrastructure/http/users-http.module';
import { UsersPersistenceModule } from './infrastructure/persistence/users-persistence.module';

@Module({
  imports: [UsersHttpModule, UsersPersistenceModule],
  exports: [UsersPersistenceModule],
})
export class UsersModule {}
