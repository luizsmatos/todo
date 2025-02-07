import { Module } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/persistence/prisma/prisma.service';

import { UsersRepository } from './../../domain/repositories/users.repository';
import { PrismaUsersRepository } from './prisma/prisma-users.repository';

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [UsersRepository],
})
export class UsersPersistenceModule {}
