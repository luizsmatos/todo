import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/infrastructure/persistence/prisma/prisma.service';
import { User } from '@src/modules/user/domain/entities/user.entity';
import { UsersRepository } from '@src/modules/user/domain/repositories/users.repository';

import { PrismaUserMapper } from './mappers/prisma-user.mapper';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  private readonly model: PrismaService['user'];

  constructor(prismaService: PrismaService) {
    this.model = prismaService.user;
  }

  async create(user: User): Promise<void> {
    const toPrisma = PrismaUserMapper.toPersistence(user);

    await this.model.create({ data: toPrisma });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.model.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.model.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }
}
