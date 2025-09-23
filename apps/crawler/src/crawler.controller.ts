import { CrawlDto, crawlEvent } from '@app/events';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CrawlerService } from './crawler.service';

@Controller()
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @EventPattern(crawlEvent)
  getHello(@Payload() data: CrawlDto) {
    console.log('data', data);

    return this.crawlerService.getHello();
  }
}
