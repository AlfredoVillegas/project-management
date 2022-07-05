import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { Checklist } from '../../domain/Checklist';
import { ChecklistRepository } from '../../domain/ChecklistRepository';
import { ChecklistNotExist } from '../../domain/Errors';

export class ChecklistFinder {
  constructor(private repository: ChecklistRepository) {}

  async execute(checklistId: string): Promise<Checklist> {
    const checklist = await this.repository.search(new Uuid(checklistId));
    if (!checklist) {
      throw new ChecklistNotExist(new Uuid(checklistId));
    }

    return checklist;
  }
}
