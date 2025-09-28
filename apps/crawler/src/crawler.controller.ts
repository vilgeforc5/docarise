import { CrawlDto, crawlEvent } from '@app/redis';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CrawlerService } from './crawler.service';

@Controller()
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @EventPattern(crawlEvent)
  crawl(@Payload() data: CrawlDto) {
    console.log(data);
    return this.crawlerService.crawl(data);
  }
}
