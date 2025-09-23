import { Module } from '@nestjs/common';
import { TransportOptionsService } from './transports.service';

@Module({
  providers: [TransportOptionsService],
  exports: [TransportOptionsService],
})
export class TransportsModule {}
