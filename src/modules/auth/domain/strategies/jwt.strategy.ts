import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { EnvService } from '@shared/infrastructure/config/env/env.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(env: EnvService) {
    const secret = env.get('JWT_SECRET');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: { sub: string }) {
    return { userId: payload.sub };
  }
}
