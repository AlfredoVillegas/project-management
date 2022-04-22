import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError';

export class TaskStatus {
  readonly value: string;
  private statusAllowed = ['created', 'accepted', 'completed'];

  constructor(value: string) {
    this.isValid(value.toLowerCase());
    this.value = value.toLowerCase();
  }

  private isValid(value: string) {
    if (!this.statusAllowed.includes(value)) {
      throw new InvalidArgumentError(`Status '${value}' invalid, status allowed : 'created', 'accepted', 'completed' `);
    }
  }
}
