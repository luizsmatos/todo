import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './modules/task/tasks.module';
import { UsersModule } from './modules/user/users.module';
import { EnvModule } from './shared/infrastructure/config/env/env.module';
import { JwtAuthGuard } from './shared/infrastructure/http/guards/jwt-auth.guard';

@Module({
  imports: [EnvModule, UsersModule, AuthModule, TasksModule],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
