import { DomainEvent } from '../../../Shared/domain/DomainEvent';

export class ProjectCreatedDomainEvent extends DomainEvent {
  static EVENT_NAME = 'project.created';
  readonly name: string;
  readonly description: string;
  readonly creator: string;
  readonly collaboratorsIds: string[];
  constructor(entityId: string, name: string, description: string, creator: string, collaboratorsIds: string[]) {
    super(ProjectCreatedDomainEvent.EVENT_NAME, entityId);
    this.name = name;
    this.description = description;
    this.creator = creator;
    this.collaboratorsIds = collaboratorsIds;
  }
}
