import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/users.module';
import { EnvModule } from './shared/infrastructure/config/env/env.module';
import { JwtAuthGuard } from './shared/infrastructure/http/guards/jwt-auth.guard';

@Module({
  imports: [EnvModule, UsersModule, AuthModule],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
