import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { CrawlerModule } from './crawler.module';
import { BadRequestFilter } from './bad-request.filter';
import { RedisModule } from '@app/redis';
import { RedisConnectionService } from '@app/redis/providers/redis-connection.service';

async function bootstrap() {
  const logger = new Logger();
  const redisContext = await NestFactory.createApplicationContext(RedisModule);
  const redisConnection = redisContext.get<RedisConnectionService>(
    RedisConnectionService,
  );

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CrawlerModule,
    redisConnection.options,
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
