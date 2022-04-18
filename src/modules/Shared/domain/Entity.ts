import { DomainEvent } from './DomainEvent';

export abstract class DomainEntity {
  private domainEvents: Array<DomainEvent>;

  constructor() {
    this.domainEvents = [];
  }

  addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  extractDomainEvents(): Array<DomainEvent> {
    const domainEvents = this.domainEvents.slice();
    this.domainEvents = [];

    return domainEvents;
  }
}
