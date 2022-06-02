import { EventEmitter } from 'events';
import { DomainEvent } from '../../domain/DomainEvent';
import { DomainEventReceiver } from '../../domain/DomainEventReceiver';
import { EventBus } from '../../domain/EventBus';

export class InMemoryAsyncEventBus implements EventBus {
  private eventEmitterBus: EventEmitter;
  constructor() {
    this.eventEmitterBus = new EventEmitter();
    console.log('Constructor Event Buss Async');
  }
  addSubscriber(receiver: DomainEventReceiver<DomainEvent>): void {
    console.log('subcriber addddd');
    receiver.susbcribedTo().map(eventName =>
      this.eventEmitterBus.on(eventName, domainEvent => {
        setImmediate(receiver.receive.bind(receiver, domainEvent));
      })
    );

    //this.eventEmitterBus.on(eventName, receiver.receive.bind(receiver)));
  }

  async publish(events: DomainEvent[]): Promise<void> {
    events.map(event => this.eventEmitterBus.emit(event.eventName, event));
  }
}
