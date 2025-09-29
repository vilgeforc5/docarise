import { Injectable } from '@nestjs/common';
import { CrawlDto } from '@app/redis';
import { Configuration, PuppeteerCrawler, RequestQueue } from 'crawlee';
import { MemoryStorage } from '@crawlee/memory-storage';

@Injectable()
export class CrawlerService {
  constructor() {}

  async crawl({ url, operationId }: CrawlDto) {
    const config = new Configuration({ persistStorage: false });
    const storage = new MemoryStorage({
      persistStorage: false,
      writeMetadata: false,
    });

    const requestQueue = await RequestQueue.open(operationId, {
      config,
      storageClient: storage,
    });

    const crawler = new PuppeteerCrawler(
      {
        requestQueue,
        requestHandler: async ({ request, enqueueLinks }) => {
          console.log(`Crawled: ${request.url}`);

          await enqueueLinks();
        },
      },
      config,
    );

    await requestQueue.addRequest({ url });
    await crawler.run();

    console.log(`Crawler worked.: ${url}`);
  }
}
