import { Module } from '@nestjs/common';
import { CrawlerController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
import { RedisModule } from '@app/redis';
import { RedisAuthGuard } from '@app/redis/providers/redis-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [RedisModule],
  controllers: [CrawlerController],
  providers: [CrawlerService, { useClass: RedisAuthGuard, provide: APP_GUARD }],
})
export class CrawlerModule {}
