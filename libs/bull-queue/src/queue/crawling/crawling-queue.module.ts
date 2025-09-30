import { Module } from '@nestjs/common';
import { BullQueueModule } from '@app/bull-queue/bull-queue.module';
import { BullModule } from '@nestjs/bullmq';
import { CrawlingQueueService } from '@app/bull-queue/queue/crawling/crawling-queue.service';
import { crawlingQueue } from '@app/bull-queue/queue/crawling/crawling.meta';

@Module({
  imports: [
    BullQueueModule,
    BullModule.registerQueue({ name: crawlingQueue.name }),
  ],
  providers: [CrawlingQueueService],
  exports: [CrawlingQueueService],
})
export class CrawlingQueueModule {}
