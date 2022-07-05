import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { ChecklistRepository } from '../domain/ChecklistRepository';
import { ChecklistFinder } from './Find/ChecklistFinder';

interface ChecklistItemAggregatorParams {
  checklistId: string;
  checklistItemId: string;
  name: string;
}

export class ChecklistItemAggregator {
  private checklistFinder: ChecklistFinder;
  private respository: ChecklistRepository;

  constructor(repository: ChecklistRepository) {
    this.respository = repository;
    this.checklistFinder = new ChecklistFinder(this.respository);
  }

  async execute({ checklistId, checklistItemId, name }: ChecklistItemAggregatorParams): Promise<void> {
    const checklist = await this.checklistFinder.execute(checklistId);

    checklist.addChecklistItem(new Uuid(checklistItemId), name);

    await this.respository.save(checklist);
  }
}
