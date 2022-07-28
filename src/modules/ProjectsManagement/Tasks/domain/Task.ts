import { DomainEntity } from '../../../Shared/domain/Entity';
import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { TaskAcceptedDomainEvent } from './TaskAcceptedDomainEvent';
import { TaskCreatedDomainEvent } from './TaskCreatedDomainEvent';
import { TaskStatus } from './TaskStatus';
import { TaskStatusUpdatedDomainEvent } from './TaskStatusUpdatedDomainEvent';

export class Task extends DomainEntity {
  readonly id: Uuid;
  readonly name: string;
  readonly description: string;
  private _status: TaskStatus;
  readonly taskDependent?: Uuid;
  public get status(): TaskStatus {
    return this._status;
  }
  private set status(v: TaskStatus) {
    this._status = v;
  }
  readonly projectId: Uuid;

  constructor(id: Uuid, name: string, description: string, status: TaskStatus, projectId: Uuid, taskDependent?: Uuid) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this._status = status;
    this.projectId = projectId;
    this.taskDependent = taskDependent;
  }

  static create(id: Uuid, name: string, description: string, projectId: Uuid, taskDependent?: Uuid): Task {
    const status = new TaskStatus('todo');
    const task = new Task(id, name, description, status, projectId, taskDependent);
    task.addDomainEvent(new TaskCreatedDomainEvent(task.id.value, task.name, task.projectId.value));
    return task;
  }

  public updateStatus(collaborator: Uuid, status: TaskStatus): void {
    this._status = status;
    this.addDomainEvent(new TaskStatusUpdatedDomainEvent(this.id.value, collaborator.value, this._status.value));
  }

  public accept(collaborator: Uuid): void {
    this._status = new TaskStatus('accepted');
    this.addDomainEvent(new TaskAcceptedDomainEvent(this.id.value, collaborator.value, this.projectId.value));
  }

  public isCompleted(): boolean {
    return this.status.value === 'completed';
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      name: this.name,
      description: this.description,
      status: this.status.value,
      projectId: this.projectId.value
    };
  }
}
