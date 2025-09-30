import { Module } from '@nestjs/common';
import { AppService } from 'apps/docarise/src/app.service';
import { AppController } from './app.controller';
import { BullQueueModule, CrawlingQueueModule } from '@app/bull-queue';

@Module({
  imports: [BullQueueModule, CrawlingQueueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
