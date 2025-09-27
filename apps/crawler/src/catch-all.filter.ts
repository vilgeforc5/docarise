import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';
import { RedisContext } from '@nestjs/microservices';
import { BaseEventsDto } from '@app/redis/events/base';

@Catch(BadRequestException)
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(_exception: unknown, host: ArgumentsHost): void {
    if (host.getType() === 'rpc') {
      const [payload, context] = host.getArgs() as unknown as [
        BaseEventsDto,
        unknown,
      ];

      const opId = payload.id;

      if (context instanceof RedisContext && opId && opId.length > 0) {
        const channel = context.getChannel();
        const args = context.getArgs();

        this.logger.error(
          `Validation failed: ${JSON.stringify({ channel, args, payload }, null, 2)}`,
          CatchEverythingFilter.name,
        );
      }
    }
  }
}
