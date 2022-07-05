import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { Checklist } from '../../domain/Checklist';
import { ChecklistRepository } from '../../domain/ChecklistRepository';
import { TaskHasNotChecklists } from '../../domain/Errors';

interface ChecklistResponse {
  id: string;
  name: string;
  taskId: string;
  items: {
    id: string;
    name: string;
    isVerified: boolean;
  }[];
  totalItemsVerified: number;
  advancedPercentage: number;
}

class ChecklistsResponse {
  readonly checklists: ChecklistResponse[];
  constructor(checklists: Checklist[]) {
    this.checklists = checklists.map(checklist => checklist.toPrimitives());
  }
}

export class ChecklistsByTaskIdFinder {
  constructor(private repository: ChecklistRepository) {}

  async execute(taskId: Uuid): Promise<ChecklistsResponse> {
    const checklists = await this.repository.findByTaskId(taskId);
    if (!checklists) throw new TaskHasNotChecklists();

    return new ChecklistsResponse(checklists);
  }
}
