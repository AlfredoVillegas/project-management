import { DomainEntity } from '../../../Shared/domain/Entity';
import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { ProjectCollaboratorsAddedDomainEvent } from './ProjectCollaboratorsAddedDomainEvent';
import { ProjectCreatedDomainEvent } from './ProjectCreatedDomainEvent';

export class Project extends DomainEntity {
  readonly id: Uuid;
  readonly name: string;
  readonly description: string;
  readonly creator: Uuid;
  readonly collaboratorsIds: Uuid[];

  constructor(id: Uuid, name: string, description: string, creator: Uuid, collaboratorsIds?: Uuid[]) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.creator = creator;
    this.collaboratorsIds = collaboratorsIds || [];
  }

  static create(id: Uuid, name: string, description: string, creator: Uuid, collaboratorsIds?: Uuid[]): Project {
    const project = new Project(id, name, description, creator, collaboratorsIds);

    project.addDomainEvent(
      new ProjectCreatedDomainEvent(
        project.id.value,
        project.name,
        project.description,
        project.creator.value,
        project.collaboratorsIds.map(element => element.value)
      )
    );
    return project;
  }

  public hasCreatePermission(userId: Uuid): boolean {
    return this.creator.value === userId.value;
  }

  public addCollaborators(collaborators: Uuid[]): void {
    collaborators.forEach(element => {
      this.collaboratorsIds.push(element);
    });

    this.addDomainEvent(
      new ProjectCollaboratorsAddedDomainEvent(
        this.id.value,
        collaborators.map(coll => coll.value)
      )
    );
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      name: this.name,
      description: this.description,
      creator: this.creator.value,
      collaboratorsIds: this.collaboratorsIds?.map(collaborator => collaborator.value)
    };
  }
}
