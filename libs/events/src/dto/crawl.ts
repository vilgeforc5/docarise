import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CrawlDto {
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
