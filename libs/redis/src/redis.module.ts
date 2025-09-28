import { tokens } from '@app/redis/tokens';
import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { RedisService } from './redis.service';
import { AuthModule } from '@app/auth';
import { RedisAuthGuard } from '@app/redis/redis-auth.guard';
import { RedisConnectionService } from '@app/redis/redis-connection.service';

@Module({
  imports: [AuthModule],
  providers: [
    {
      inject: [RedisConnectionService],
      useFactory: (options: RedisConnectionService) => {
        return ClientProxyFactory.create(options.options);
      },
      provide: tokens.redisClient,
    },
    RedisConnectionService,
    RedisService,
    RedisAuthGuard,
  ],
  exports: [RedisService, RedisAuthGuard, RedisConnectionService],
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
