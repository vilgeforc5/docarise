import { tokens } from '@app/redis/tokens';
import { TransportOptionsService, TransportsModule } from '@app/transports';
import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { RedisService } from './redis.service';
import { AuthModule } from '@app/auth';
import { RedisAuthGuard } from '@app/redis/redis-auth.guard';

@Module({
  imports: [TransportsModule, AuthModule],
  providers: [
    {
      inject: [TransportOptionsService],
      useFactory: (options: TransportOptionsService) => {
        return ClientProxyFactory.create(options.redis);
      },
      provide: tokens.redisClient,
    },
    RedisService,
    RedisAuthGuard,
  ],
  exports: [RedisService, RedisAuthGuard],
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
