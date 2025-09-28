import { Injectable } from '@nestjs/common';
import { RedisOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RedisConnectionService {
  get options(): RedisOptions {
    const port = parseInt(process.env.REDIS_PORT || '');
    const host = process.env.REDIS_HOST;

    if (Number.isNaN(port)) {
      throw new Error('No redis port env variable define');
    }

    if (host?.length === 0 || !host) {
      throw new Error('No redis host env variable define');
    }

    return { transport: Transport.REDIS, options: { port, host } };
  }
}
