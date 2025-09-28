import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { TransportOptionsService, TransportsModule } from 'libs/transports/src';
import { CrawlerModule } from './crawler.module';
import { BadRequestFilter } from './bad-request.filter';

async function bootstrap() {
  const logger = new Logger();
  const transportContext =
    await NestFactory.createApplicationContext(TransportsModule);
  const transportsService = transportContext.get<TransportOptionsService>(
    TransportOptionsService,
  );

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CrawlerModule,
    transportsService.redis,
  );

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new BadRequestFilter(logger));
  app.useLogger(logger);

  app.status.subscribe((status) => {
    logger.log(status, 'app.status.subscribe');
  });

  await app.listen();
}

bootstrap();
