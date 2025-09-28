import { IsUrl } from 'class-validator';
import { BaseEventsDto } from './base';

export class CrawlDto extends BaseEventsDto {
  @IsUrl()
  url: string;
}

export const crawlEvent = 'crawl';

declare global {
  interface EventMap {
    [crawlEvent]: CrawlDto;
  }
}
