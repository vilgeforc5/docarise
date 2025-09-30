import { tokens } from '@app/redis/tokens';
import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { RedisService } from './providers/redis.service';
import { AuthModule } from '@app/auth';
import { RedisAuthGuard } from '@app/redis/providers/redis-auth.guard';
import { ConfigModule } from '@app/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [AuthModule, ConfigModule],
  providers: [
    {
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return ClientProxyFactory.create({
          options: {
            port: config.get<string>('REDIS_PORT'),
            host: config.get<number>('REDIS_HOST'),
          },
        });
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
