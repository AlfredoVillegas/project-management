import { DomainEvent } from '../../domain/DomainEvent';
import { EventBus } from '../../domain/EventBus';
import { DomainEventReceiver } from '../../domain/DomainEventReceiver';

export class InMemorySyncEventBus implements EventBus {
  private receiversMap: Map<string, DomainEventReceiver<DomainEvent>[]>;

  constructor() {
    this.receiversMap = new Map();
  }

  public addSubscriber(receiver: DomainEventReceiver<DomainEvent>): void {
    const eventsNames = receiver.susbcribedTo();
    eventsNames.map(eventName => this.subscribe(eventName, receiver));
  }

  private subscribe(eventName: string, receiver: DomainEventReceiver<DomainEvent>): void {
    const eventsRegistered = this.receiversMap.get(eventName);
    if (eventsRegistered) {
      eventsRegistered.push(receiver);
      this.receiversMap.set(eventName, eventsRegistered);
    } else {
      this.receiversMap.set(eventName, [receiver]);
    }
  }

  public async publish(events: DomainEvent[]): Promise<void> {
    for (let event of events) {
      const receivers = this.receiversMap.get(event.eventName);
      if (receivers) {
        receivers.map(receiver => receiver.receive(event));
      }
    }
  }
}
