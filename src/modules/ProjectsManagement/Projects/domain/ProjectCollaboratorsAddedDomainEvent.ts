import { DomainEvent } from '../../../Shared/domain/DomainEvent';

export class ProjectCollaboratorsAddedDomainEvent extends DomainEvent {
  static EVENT_NAME = 'project_collaborators.added';
  readonly collaboratorsIds: string[];
  constructor(entityId: string, collaboratorsIds: string[]) {
    super(ProjectCollaboratorsAddedDomainEvent.EVENT_NAME, entityId);
    this.collaboratorsIds = collaboratorsIds;
  }
}
