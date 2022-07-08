import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { ChecklistRepository } from '../domain/ChecklistRepository';

export class ChecklistDeleter {
  private repository: ChecklistRepository;

  constructor(repository: ChecklistRepository) {
    this.repository = repository;
  }

  public async execute(checklistId: string): Promise<void> {
    await this.repository.delete(new Uuid(checklistId));
  }
}
