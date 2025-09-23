import { EventsService } from '@app/events';
import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy, ClientsModule } from '@nestjs/microservices';
import { TransportOptionsService, TransportsModule } from 'libs/transports/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appTokens } from './app.tokens';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [TransportsModule],
        inject: [TransportOptionsService],
        name: appTokens.clientProxy,
        useFactory: (transport: TransportOptionsService) => transport.redis,
      },
    ]),
    TransportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      inject: [appTokens.clientProxy],
      useFactory: (clientProxy: ClientProxy) => new EventsService(clientProxy),
      provide: EventsService,
    },
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    @Inject(appTokens.clientProxy)
    private readonly redisService: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.redisService.connect();
  }
}
