import { DomainEvent } from '../../Shared/domain/DomainEvent';

export class TaskCreatedDomainEvent extends DomainEvent {
  static EVENT_NAME = 'task.created';
  readonly name: string;
  readonly projectId: string;

  constructor(entityId: string, name: string, projectId: string) {
    super(TaskCreatedDomainEvent.EVENT_NAME, entityId);
    this.name = name;
    this.projectId = projectId;
  }
}
