import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule } from '@app/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          connection: {
            url: config.get('REDIS_HOST'),
            port: config.get('REDIS_PORT'),
          },
        };
      },
    }),
  ],
  exports: [BullModule],
})
export class BullQueueModule {}
