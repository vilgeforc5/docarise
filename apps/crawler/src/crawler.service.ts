import { Injectable } from '@nestjs/common';
import { CrawlDto } from '@app/redis';
import { PuppeteerCrawler, RequestQueue } from 'crawlee';

@Injectable()
export class CrawlerService {
  constructor() {}

  async crawl({ url, operationId }: CrawlDto) {
    const requestQueue = await RequestQueue.open(operationId + Math.random());

    const crawler = new PuppeteerCrawler({
      requestQueue,
      async requestHandler({ request, page, enqueueLinks, log }) {
        const title = await page.title();
        log.info(`Title of ${request.loadedUrl} is '${title}'`);

        await enqueueLinks();
      },
    });

    await requestQueue.addRequest({ url });
    await crawler.run();
  }
}
