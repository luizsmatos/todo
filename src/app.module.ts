import { Module } from '@nestjs/common';

import { UsersModule } from './modules/user/users.module';
import { EnvModule } from './shared/infrastructure/config/env/env.module';

@Module({
  imports: [EnvModule, UsersModule],
  providers: [],
})
export class AppModule {}
