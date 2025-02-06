import { Module } from '@nestjs/common';

import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { UsersPersistenceModule } from '../persistence/users-persistence.module';
import { RegisterUserController } from './controllers/register-user.controller';

@Module({
  imports: [UsersPersistenceModule],
  controllers: [RegisterUserController],
  providers: [RegisterUserUseCase],
})
export class UsersHttpModule {}
