import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { ChecklistItemAlreadyIsVerified } from './Errors';

export class ChecklistItem {
  readonly id: Uuid;
  private name: string;
  private isVerified: boolean;

  constructor(id: Uuid, name: string, isVerified: boolean) {
    this.id = id;
    this.name = name;
    this.isVerified = isVerified;
  }

  public get _isVerified(): boolean {
    return this.isVerified;
  }

  static create(id: Uuid, title: string): ChecklistItem {
    const checklistStep = new ChecklistItem(id, title, false);
    return checklistStep;
  }

  public checkOrUncheckItem(isVerified: boolean) {
    if (this._isVerified === isVerified) {
      throw new ChecklistItemAlreadyIsVerified(isVerified);
    }

    this.isVerified = isVerified;
  }

  public rename(newName: string): void {
    this.name = newName;
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      name: this.name,
      isVerified: this.isVerified
    };
  }
}
