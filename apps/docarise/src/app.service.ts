import { RedisService } from '@app/redis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly redis: RedisService) {}
  getHello() {
    this.redis.emit('crawl', {
      url: 'https://www.deepseek.com/',
      operationId: '123',
    });
    this.redis.emit('crawl', {
      url: 'WRONGHTTP121231233ps://www.deepseek.com/',
      operationId: ' 12123',
    });

    return 'Hello World!';
  }
}
