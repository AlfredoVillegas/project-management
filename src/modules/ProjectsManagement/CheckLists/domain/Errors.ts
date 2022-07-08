import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class ChecklistNotExist extends Error {
  name: string = 'ChecklistNotExist';
  constructor(checklistId: Uuid) {
    super(`Checklist: ${checklistId} does not exists`);
  }
}

export class ChecklistItemNotFound extends Error {
  name: string = 'ChecklistItemNotFound';
  constructor(checklistItemId: Uuid) {
    super(`Checklist Item: ${checklistItemId} not found`);
  }
}

export class ChecklistItemAlreadyIsVerified extends Error {
  name: string = 'ChecklistItemAlreadyIsVerified';
  constructor(isVerified: boolean) {
    const message = isVerified ? 'the item is already verified' : 'the item is already unverified';
    super(message);
  }
}

export class TaskHasNotChecklists extends Error {
  name: string = 'TaskHasNotChecklists';
  constructor() {
    super('the task has not checklists');
  }
}
