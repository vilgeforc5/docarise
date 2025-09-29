import { RedisService } from '@app/redis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly redis: RedisService) {}

  getHello() {
    this.redis.emit('crawl', {
      url: 'https://redux-saga.js.org/docs/About/',
      operationId: Math.random().toString(),
    });
  }
}
