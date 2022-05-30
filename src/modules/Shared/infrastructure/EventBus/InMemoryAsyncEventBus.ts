import { EventEmitter } from 'events';
import { DomainEvent } from '../../domain/DomainEvent';
import { DomainEventReceiver } from '../../domain/DomainEventReceiver';
import { EventBus } from '../../domain/EventBus';

class InMemoryAsyncEventBus implements EventBus {
  private eventEmitterBus: EventEmitter;
  constructor() {
    this.eventEmitterBus = new EventEmitter();
  }
  addSubscriber(receiver: DomainEventReceiver<DomainEvent>): void {
    receiver.susbcribedTo().map(eventName => this.eventEmitterBus.on(eventName, receiver.receive.bind(receiver)));
  }

  async publish(events: DomainEvent[]): Promise<void> {
    events.map(event => this.eventEmitterBus.emit(event.eventName, event));
  }
}
