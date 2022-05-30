import { DomainEvent } from '../../../Shared/domain/DomainEvent';

export class TaskAcceptedDomainEvent extends DomainEvent {
  static EVENT_NAME = 'task.accepted';
  readonly collaborator: string;
  readonly projectId: string;

  constructor(entityId: string, collaborator: string, projectId: string) {
    super(TaskAcceptedDomainEvent.EVENT_NAME, entityId);
    this.collaborator = collaborator;
    this.projectId = projectId;
  }
}
