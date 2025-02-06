import { Module } from '@nestjs/common';
import { UsersModule } from '@src/modules/user/users.module';

import { AuthenticateUserUseCase } from '../../application/use-cases/authenticate-user.use-case';
import { AuthenticateUserController } from './controllers/authenticate-user.controller';

@Module({
  imports: [UsersModule],
  controllers: [AuthenticateUserController],
  providers: [AuthenticateUserUseCase],
})
export class AuthHttpModule {}
