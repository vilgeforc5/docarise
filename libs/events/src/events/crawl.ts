import { BaseEventsDto } from '@app/events/events/base';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CrawlDto extends BaseEventsDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string;
}

export const crawlEvent = 'crawl';

declare global {
  interface EventMap {
    [crawlEvent]: CrawlDto;
  }
}
