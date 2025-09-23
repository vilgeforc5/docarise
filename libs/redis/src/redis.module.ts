import { tokens } from '@app/redis/tokens';
import { TransportOptionsService, TransportsModule } from '@app/transports';
import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { RedisService } from './redis.service';

@Module({
  imports: [TransportsModule],
  providers: [
    {
      inject: [TransportOptionsService],
      useFactory: (options: TransportOptionsService) => {
        return ClientProxyFactory.create(options.redis);
      },
      provide: tokens.redisClient,
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule implements OnApplicationBootstrap {
  constructor(
    @Inject(tokens.redisClient)
    private readonly redisService: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.redisService.connect();
  }
}
