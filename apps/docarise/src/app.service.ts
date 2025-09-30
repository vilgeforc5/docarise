import { Injectable } from '@nestjs/common';
import { CrawlingQueueService } from '@app/bull-queue';

@Injectable()
export class AppService {
  constructor(private readonly crawlingQueue: CrawlingQueueService) {}

  async getHello() {
    await this.crawlingQueue.start({
      url: 'https://redux-saga.js.org/docs/About/',
    });
  }
}
