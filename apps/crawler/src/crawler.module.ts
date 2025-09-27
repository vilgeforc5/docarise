import { Module } from '@nestjs/common';
import { CrawlerController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
import { RedisModule } from '@app/redis';

@Module({
  imports: [RedisModule],
  controllers: [CrawlerController],
  providers: [CrawlerService],
})
export class CrawlerModule {}
