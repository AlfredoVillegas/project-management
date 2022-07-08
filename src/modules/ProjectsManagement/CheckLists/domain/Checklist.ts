import { DomainEntity } from '../../../Shared/domain/Entity';
import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { ChecklistItem } from './ChecklistItem';
import { ChecklistItemNotFound } from './Errors';

export class Checklist extends DomainEntity {
  readonly id: Uuid;
  private name: string;
  readonly items: ChecklistItem[];
  readonly taskId: Uuid;
  private totalItemsVerified: number;
  private advancedPercentage: number;

  constructor(
    id: Uuid,
    name: string,
    taskId: Uuid,
    items: ChecklistItem[],
    totalItemsVerified: number,
    advancedPercentage: number
  ) {
    super();
    this.id = id;
    this.name = name;
    this.taskId = taskId;
    this.items = items;
    this.totalItemsVerified = totalItemsVerified;
    this.advancedPercentage = advancedPercentage;
  }

  static create(id: Uuid, name: string, taskId: Uuid, items?: ChecklistItem[]): Checklist {
    const totalItemsVerified = 0;
    const advancedPercentage = 0;
    const checkList = new Checklist(id, name, taskId, items || [], totalItemsVerified, advancedPercentage);
    return checkList;
  }

  public rename(newName: string) {
    this.name = newName;
  }

  public removeItem(itemId: Uuid) {
    const indexItemToDelete = this.findIndexItemOrFail(itemId);

    if (this.items[indexItemToDelete]._isVerified) {
      this.totalItemsVerified -= 1;
    }

    this.items.splice(indexItemToDelete, 1);

    this.recalculateAdvancedPercentage();
  }

  private findIndexItemOrFail(itemId: Uuid) {
    const indexItem = this.items.findIndex(item => item.id.value === itemId.value);
    if (indexItem === -1) {
      throw new ChecklistItemNotFound(itemId);
    }
    return indexItem;
  }

  public markAnItemAsVerifiedOrUnverified(itemId: Uuid, isVerified: boolean): void {
    const item = this.findItemOrFail(itemId);

    item.checkOrUncheckItem(isVerified);

    if (item._isVerified) {
      this.totalItemsVerified += 1;
    } else {
      this.totalItemsVerified -= 1;
    }

    this.recalculateAdvancedPercentage();
  }

  private findItemOrFail(itemId: Uuid) {
    const item = this.items.find(item => item.id.value === itemId.value);
    if (!item) throw new ChecklistItemNotFound(itemId);
    return item;
  }

  public renameItem(itemId: Uuid, newName: string): void {
    const item = this.findItemOrFail(itemId);
    item.rename(newName);
  }

  public addChecklistItem(checklistItemId: Uuid, name: string): void {
    const itemExists = this.itemExists(checklistItemId);
    if (!itemExists) {
      const item = ChecklistItem.create(checklistItemId, name);
      this.items.push(item);

      this.recalculateAdvancedPercentage();
    }
  }

  private itemExists(checklistItemId: Uuid): boolean {
    const exists = this.items.find(item => item.id.value === checklistItemId.value);
    return exists !== undefined;
  }

  private recalculateAdvancedPercentage() {
    const totalItems = this.items.length;
    if (totalItems === 0) {
      this.advancedPercentage = 0;
      return;
    }

    this.advancedPercentage = (this.totalItemsVerified * 100) / totalItems;
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      name: this.name,
      taskId: this.taskId.value,
      items: this.items.map(item => item.toPrimitives()),
      totalItemsVerified: this.totalItemsVerified,
      advancedPercentage: this.advancedPercentage
    };
  }
}
