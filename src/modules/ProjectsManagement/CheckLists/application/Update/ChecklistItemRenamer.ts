import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { ChecklistRepository } from '../../domain/ChecklistRepository';
import { ChecklistFinder } from '../Find/ChecklistFinder';

export class ChecklistItemRenamer {
  private checklistFinder: ChecklistFinder;
  private respository: ChecklistRepository;

  constructor(repository: ChecklistRepository) {
    this.respository = repository;
    this.checklistFinder = new ChecklistFinder(this.respository);
  }

  async execute(checklistId: string, itemId: string, newName: string): Promise<void> {
    const checklist = await this.checklistFinder.execute(checklistId);

    checklist.renameItem(new Uuid(itemId), newName);

    await this.respository.save(checklist);
  }
}
