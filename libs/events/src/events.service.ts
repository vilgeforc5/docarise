// import { EventName, eventsMap,  } from '@app/events/events-map';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

type EventName = keyof EventMap;
type Payload<E extends EventName> = EventMap[E];

@Injectable()
export class EventsService {
  constructor(private readonly client: ClientProxy) {}

  emit<E extends EventName>(event: E, payload: Payload<E>) {
    return this.client.emit(event, payload);
  }

  send<E extends EventName, R = any>(event: E, payload: Payload<E>) {
    return this.client.send<R>(event, payload);
  }
}
