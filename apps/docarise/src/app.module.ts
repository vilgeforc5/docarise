import { RedisModule } from '@app/redis/redis.module';
import { Module } from '@nestjs/common';
import { AppService } from 'apps/docarise/src/app.service';
import { AppController } from './app.controller';

@Module({
  imports: [RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
