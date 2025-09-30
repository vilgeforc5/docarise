import { Processor, WorkerHost } from '@nestjs/bullmq';
import { crawlingQueue } from '@app/bull-queue';
import { Job } from 'bullmq';
import { MemoryStorage } from '@crawlee/memory-storage';
import { Configuration, PuppeteerCrawler, RequestQueue } from 'crawlee';
import { TJobDto } from '@app/bull-queue/queue/queue.types';

@Processor(crawlingQueue.name, { concurrency: 3 })
export class CrawlerProcessor extends WorkerHost {
  async process(job: Job<TJobDto<typeof crawlingQueue, 'start'>>) {
    console.log(`Processing job: ${job.name}`);
    await this.crawl({
      url: job.data.url,
      operationId: job.id || Math.random().toString(),
    });
  }

  async crawl({ url, operationId }: { url: string; operationId: string }) {
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
