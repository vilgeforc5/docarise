import { Queue } from '@app/bull-queue/queue/queue.types';
import { IsUrl } from 'class-validator';

export class CrawlingStartDto {
  @IsUrl()
  url: string;
}

export const crawlingQueue = {
  name: 'crawling',
  jobs: {
    start: {
      name: 'start',
      dto: CrawlingStartDto,
    },
  },
} satisfies Queue<{
  start: { dto: CrawlingStartDto };
}>;
