import { DomainEntity } from '../../../Shared/domain/Entity';
import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { ProjectCollaboratorsAddedDomainEvent } from './ProjectCollaboratorsAddedDomainEvent';
import { ProjectCreatedDomainEvent } from './ProjectCreatedDomainEvent';

export class Project extends DomainEntity {
  readonly id: Uuid;
  private _name: string;
  private _description: string;
  readonly creator: Uuid;
  readonly collaboratorsIds: Uuid[];

  constructor(id: Uuid, name: string, description: string, creator: Uuid, collaboratorsIds?: Uuid[]) {
    super();
    this.id = id;
    this._name = name;
    this._description = description;
    this.creator = creator;
    this.collaboratorsIds = collaboratorsIds || [];
  }

  public get name(): string {
    return this._name;
  }
  public get description(): string {
    return this._description;
  }

  static create(id: Uuid, name: string, description: string, creator: Uuid, collaboratorsIds?: Uuid[]): Project {
    const project = new Project(id, name, description, creator, collaboratorsIds);

    project.addDomainEvent(
      new ProjectCreatedDomainEvent(
        project.id.value,
        project._name,
        project._description,
        project.creator.value,
        project.collaboratorsIds.map(element => element.value)
      )
    );
    return project;
  }

  public hasCreatePermission(userId: Uuid): boolean {
    return this.creator.value === userId.value;
  }

  public UpdateMainAttributes(newName?: string, newDescription?: string) {
    this._name = newName || this._name;
    this._description = newDescription || this._description;
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
      name: this._name,
      description: this._description,
      creator: this.creator.value,
      collaboratorsIds: this.collaboratorsIds?.map(collaborator => collaborator.value)
    };
  }
}
