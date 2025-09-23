import { CrawlDto } from '@app/events/dto/crawl-dto';

export type EventName = 'crawl';
export type Payload<T> = new (data: T) => T;

export const eventsMap = {
  crawl: { name: 'crawl', payload: CrawlDto },
} satisfies Record<EventName, { payload: Payload<unknown>; name: EventName }>;
