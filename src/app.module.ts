import { Module } from '@nestjs/common';

import { UsersModule } from './modules/user/users.module';

@Module({
  imports: [UsersModule],
  providers: [],
})
export class AppModule {}
