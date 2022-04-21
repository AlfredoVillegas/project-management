import { DomainEvent } from '../../../../src/modules/Shared/domain/DomainEvent';
import { DomainEventReceiver } from '../../../../src/modules/Shared/domain/DomainEventReceiver';
import { EventBus } from '../../../../src/modules/Shared/domain/EventBus';

export class EventBusMock implements EventBus {
  private callsToPublishEvent = 0;

  constructor() {}

  addSubscribe(receiver: DomainEventReceiver<DomainEvent>): void {}
  unsubscribe(receiver: DomainEventReceiver<DomainEvent>): void {}

  async publish(events: DomainEvent[]): Promise<void> {
    this.callsToPublishEvent++;
    return Promise.resolve();
  }
  public getCallsToPublishEvent(): number {
    return this.callsToPublishEvent;
  }
}
