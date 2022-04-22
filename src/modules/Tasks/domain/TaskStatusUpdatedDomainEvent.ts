import { DomainEvent } from '../../Shared/domain/DomainEvent';

export class TaskStatusUpdatedDomainEvent extends DomainEvent {
  static EVENT_NAME = 'task_status.updated';
  readonly collaborator: string;
  readonly status: string;

  constructor(taskId: string, collaborator: string, status: string) {
    super(TaskStatusUpdatedDomainEvent.EVENT_NAME, taskId);
    this.collaborator = collaborator;
    this.status = status;
  }
}
