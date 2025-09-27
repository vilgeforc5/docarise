import { Injectable } from '@nestjs/common';

@Injectable()
export class CrawlerService {
  constructor() {}

  getHello(): string {
    return 'Hello World!';
  }
}
