import { RedisService } from '@app/redis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly redis: RedisService) {}
  getHello() {
    this.redis.emit('crawl', {
      url: 'https://www.deepseek.com/',
      id: '123',
    });
    this.redis.emit('crawl', {
      url: 'WRONGhtt121231233ps://www.deepseek.com/',
      id: ' 12123',
    });

    return 'Hello World!';
  }
}
