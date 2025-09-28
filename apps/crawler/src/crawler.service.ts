import { Injectable } from '@nestjs/common';
import { CrawlDto } from '@app/redis';

@Injectable()
export class CrawlerService {
  constructor() {}

  crawl({ url, operationId }: CrawlDto) {
    console.log(url, operationId);
  }
}
