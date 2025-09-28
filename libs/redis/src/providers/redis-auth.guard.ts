import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BaseEventsDto } from '@app/redis/events/base';

@Injectable()
export class RedisAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(ctx: ExecutionContext) {
    if (ctx.getType<'rpc'>() !== 'rpc') return true;

    const data: BaseEventsDto | undefined = ctx.switchToRpc().getData();
    const token = data?.authToken;

    if (!token) throw new UnauthorizedException('Missing token');

    try {
      this.jwt.verify(token);

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
