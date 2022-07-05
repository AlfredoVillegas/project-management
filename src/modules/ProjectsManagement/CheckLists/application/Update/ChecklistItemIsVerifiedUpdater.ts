import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { ChecklistRepository } from '../../domain/ChecklistRepository';
import { ChecklistFinder } from '../Find/ChecklistFinder';

export class ChecklistItemIsVerifiedUpdater {
  private checklistFinder: ChecklistFinder;
  private respository: ChecklistRepository;

  constructor(repository: ChecklistRepository) {
    this.respository = repository;
    this.checklistFinder = new ChecklistFinder(this.respository);
  }

  async execute(checklistId: string, itemId: string, isVerified: boolean): Promise<void> {
    const checklist = await this.checklistFinder.execute(checklistId);

    checklist.markAnItemAsVerifiedOrUnverified(new Uuid(itemId), isVerified);

    await this.respository.save(checklist);
  }
}
