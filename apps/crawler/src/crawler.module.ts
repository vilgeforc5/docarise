import { Module } from '@nestjs/common';
import { BullQueueModule, CrawlingQueueModule } from '@app/bull-queue';
import { CrawlerProcessor } from './crawler.processor';

@Module({
  imports: [BullQueueModule, CrawlingQueueModule],
  providers: [CrawlerProcessor],
})
export class CrawlerModule {}
