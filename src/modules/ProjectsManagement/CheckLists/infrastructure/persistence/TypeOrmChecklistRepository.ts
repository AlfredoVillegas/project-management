import { getConnection, Repository } from 'typeorm';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { Checklist } from '../../domain/Checklist';
import { ChecklistRepository } from '../../domain/ChecklistRepository';
import { ChecklistEntity } from './typeorm/ChecklistEntity';

export class TypeOrmChecklistRepository implements ChecklistRepository {
  private repository: Repository<Checklist>;
  constructor() {
    this.repository = getConnection().getRepository(ChecklistEntity);
  }

  async save(checklist: Checklist): Promise<void> {
    await this.repository.save(checklist);
  }

  async search(id: Uuid): Promise<Checklist | null | undefined> {
    const checklist = await this.repository.findOne({ id });
    return checklist;
  }

  async findByTaskId(taskId: Uuid): Promise<Checklist[] | null | undefined> {
    const checklistsOfTask = await this.repository.find({ taskId });
    return checklistsOfTask;
  }
}
