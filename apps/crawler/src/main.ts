import { NestFactory } from '@nestjs/core';
import { CrawlerModule } from './crawler.module';

async function bootstrap() {
  await NestFactory.createApplicationContext(CrawlerModule);
}

bootstrap();
