import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { Checklist } from '../domain/Checklist';
import { ChecklistItem } from '../domain/ChecklistItem';
import { ChecklistRepository } from '../domain/ChecklistRepository';

export interface ChecklistCreatorParams {
  id: string;
  name: string;
  taskId: string;
  items?: ChecklistItemCreatorParams[];
}

interface ChecklistItemCreatorParams {
  id: string;
  title: string;
}

export class ChecklistCreator {
  constructor(private repository: ChecklistRepository) {}

  async execute({ id, name, taskId, items }: ChecklistCreatorParams): Promise<void> {
    const checkListId = new Uuid(id);

    const itemsMap = items ? this.mapItemsFromPrimitives(items) : undefined;

    const checklist = Checklist.create(checkListId, name, new Uuid(taskId), itemsMap);

    await this.repository.save(checklist);
  }

  private mapItemsFromPrimitives(items: ChecklistItemCreatorParams[]) {
    return items.map(item => ChecklistItem.create(new Uuid(item.id), item.title));
  }
}

/*
class CreateChecklistRequest {
  readonly id: Uuid;
  readonly name: string;
  readonly taskId: Uuid;
  readonly items?: ChecklistItem[];

  constructor(params: ChecklistCreatorParams) {
    this.id = new Uuid(params.id);
    this.name = params.name;
    this.taskId = new Uuid(params.taskId);
    this.items = params.items ? this.mapItemsFromPrimitives(params.items) : undefined;
  }

  private mapItemsFromPrimitives(items: ChecklistItemCreator[]) {
    return items.map(item => ChecklistItem.create(new Uuid(item.id), item.title));
  }
}
*/
