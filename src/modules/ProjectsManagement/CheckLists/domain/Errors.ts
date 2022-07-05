import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class ChecklistNotExist extends Error {
  constructor(checklistId: Uuid) {
    super(`Checklist: ${checklistId} does not exists`);
  }
}

export class ChecklistItemNotFound extends Error {
  constructor(checklistItemId: Uuid) {
    super(`Checklist Item: ${checklistItemId} not found`);
  }
}

export class ChecklistItemAlreadyIsVerified extends Error {
  constructor(isVerified: boolean) {
    const message = isVerified ? 'the item is already verified' : 'the item is already unverified';
    super(message);
  }
}

export class TaskHasNotChecklists extends Error {
  constructor() {
    super('the task has not checklists');
  }
}
