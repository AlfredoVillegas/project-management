import { DomainEntity } from '../../Shared/domain/Entity';
import { Uuid } from '../../Shared/domain/value-object/Uuid';
import { TaskAcceptedDomainEvent } from './TaskAcceptedDomainEvent';
import { TaskStatus } from './TaskStatus';

export class Task extends DomainEntity {
  readonly id: Uuid;
  readonly name: string;
  readonly description: string;
  private _status: TaskStatus;
  public get status(): TaskStatus {
    return this._status;
  }
  private set status(v: TaskStatus) {
    this._status = v;
  }
  readonly projectId: Uuid;

  constructor(id: Uuid, name: string, description: string, status: TaskStatus, projectId: Uuid) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this._status = status;
    this.projectId = projectId;
  }

  static create(id: Uuid, name: string, description: string, projectId: Uuid): Task {
    const status = new TaskStatus('created');
    const task = new Task(id, name, description, status, projectId);
    return task;
  }

  public accept(collaborator: Uuid): void {
    this._status = new TaskStatus('accepted');
    this.addDomainEvent(new TaskAcceptedDomainEvent(this.id.value, collaborator.value));
  }
}
