import { Module } from '@nestjs/common';

import { GetProfileUseCase } from '../../application/use-cases/get-profile.use-case';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { UsersPersistenceModule } from '../persistence/users-persistence.module';
import { GetProfileController } from './controllers/get-profile.controller';
import { RegisterUserController } from './controllers/register-user.controller';

@Module({
  imports: [UsersPersistenceModule],
  controllers: [RegisterUserController, GetProfileController],
  providers: [RegisterUserUseCase, GetProfileUseCase],
})
export class UsersHttpModule {}
