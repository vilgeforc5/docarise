import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import {
  crawlingQueue,
  CrawlingStartDto,
} from '@app/bull-queue/queue/crawling/crawling.meta';

@Injectable()
export class CrawlingQueueService {
  constructor(@InjectQueue(crawlingQueue.name) private queue: Queue) {}

  async start(dto: CrawlingStartDto) {
    return this.queue.add(crawlingQueue.jobs.start.name, dto);
  }
}
