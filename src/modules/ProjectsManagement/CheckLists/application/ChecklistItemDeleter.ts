import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { ChecklistRepository } from '../domain/ChecklistRepository';
import { ChecklistFinder } from './Find/ChecklistFinder';

export class ChecklistItemDeleter {
  private repository: ChecklistRepository;
  private finder: ChecklistFinder;

  constructor(repository: ChecklistRepository) {
    this.repository = repository;
    this.finder = new ChecklistFinder(this.repository);
  }

  async execute(checklistId: string, checklistItemId: string): Promise<void> {
    const checklist = await this.finder.execute(checklistId);

    checklist.removeItem(new Uuid(checklistItemId));

    //todo: refactorizar
    await this.repository.deleteItem(new Uuid(checklistItemId));

    await this.repository.save(checklist);
  }
}
