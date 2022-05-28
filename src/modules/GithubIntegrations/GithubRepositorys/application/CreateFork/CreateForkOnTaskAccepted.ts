import { DomainEventReceiver } from '../../../../Shared/domain/DomainEventReceiver';
import { TaskAcceptedDomainEvent } from '../../../../Tasks/domain/TaskAcceptedDomainEvent';
import { ForkCreator } from './ForkCreator';

export class CreateForkOnTaskAccepted implements DomainEventReceiver<TaskAcceptedDomainEvent> {
  constructor(private creator: ForkCreator) {}
  async receive(domainEvent: TaskAcceptedDomainEvent): Promise<void> {
    const { collaborator: userId, projectId } = domainEvent;
    await this.creator.execute({ userId, projectId });
  }

  susbcribedTo(): string[] {
    return [TaskAcceptedDomainEvent.EVENT_NAME];
  }
}
