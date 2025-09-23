import { EventsService } from '@app/events';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly eventsService: EventsService) {}

  getHello() {
    this.eventsService.emit('crawl', { url: 'https://www.deepseek.com/' });
    this.eventsService.emit('crawl', {
      url: 'WRONGhtt121231233ps://www.deepseek.com/',
    });

    return 'Hello World!';
  }
}
