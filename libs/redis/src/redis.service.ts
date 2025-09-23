import { tokens } from '@app/redis/tokens';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

type EventName = keyof EventMap;
type Payload<E extends EventName> = EventMap[E];

@Injectable()
export class RedisService {
  constructor(
    @Inject(tokens.redisClient) private readonly client: ClientProxy,
  ) {}

  emit<E extends EventName>(event: E, payload: Payload<E>) {
    return this.client.emit(event, payload);
  }

  send<E extends EventName>(event: E, payload: Payload<E>) {
    return this.client.send(event, payload);
  }
}
