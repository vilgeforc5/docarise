import { tokens } from '@app/redis/tokens';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

type EventName = keyof EventMap;
type Payload<E extends EventName> = Omit<EventMap[E], 'authToken'>;

@Injectable()
export class RedisService {
  constructor(
    @Inject(tokens.redisClient) private readonly client: ClientProxy,
    private readonly jwt: JwtService,
  ) {}

  emit<E extends EventName>(event: E, payload: Payload<E>) {
    const authToken = this.jwt.sign(payload);

    return this.client.emit(event, { ...payload, authToken });
  }

  send<E extends EventName>(event: E, payload: Payload<E>) {
    const authToken = this.jwt.sign(payload);

    return this.client.send(event, { ...payload, authToken });
  }
}
