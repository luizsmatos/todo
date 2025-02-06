import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EnvModule } from '@src/shared/infrastructure/config/env/env.module';
import { EnvService } from '@src/shared/infrastructure/config/env/env.service';

import { JwtStrategy } from './domain/strategies/jwt.strategy';
import { AuthHttpModule } from './infrastructure/http/auth-http.module';

@Module({
  imports: [
    AuthHttpModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory: (envService: EnvService) => ({
        secret: envService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [EnvService, JwtStrategy],
  exports: [AuthHttpModule],
})
export class AuthModule {}
