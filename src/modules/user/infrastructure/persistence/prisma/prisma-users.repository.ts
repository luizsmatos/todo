import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { User } from '@src/modules/user/domain/entities/user.entity';
import { UsersRepository } from '@src/modules/user/domain/repositories/users.repository';
import { PrismaService } from '@src/shared/infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  private readonly model: PrismaService['user'];

  constructor(prismaService: PrismaService) {
    this.model = prismaService.user;
  }

  async create(user: User): Promise<void> {
    const toPrisma: Prisma.UserCreateInput = {
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    await this.model.create({ data: toPrisma });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.model.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    return new User(user);
  }
}
