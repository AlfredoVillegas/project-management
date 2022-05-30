import { DomainEvent } from './DomainEvent';
import { DomainEventReceiver } from './DomainEventReceiver';

export interface EventBus {
  addSubscriber(receiver: DomainEventReceiver<DomainEvent>): void;
  publish(events: DomainEvent[]): Promise<void>;
}
