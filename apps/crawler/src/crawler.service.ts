import { RedisService } from '@app/redis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CrawlerService {
  constructor(private readonly redis: RedisService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
