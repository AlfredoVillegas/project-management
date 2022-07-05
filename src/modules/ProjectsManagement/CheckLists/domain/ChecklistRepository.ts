import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { Checklist } from './Checklist';

export interface ChecklistRepository {
  save(checklist: Checklist): Promise<void>;
  search(id: Uuid): Promise<Checklist | undefined | null>;
  findByTaskId(taskId: Uuid): Promise<Checklist[] | undefined | null>;
}
