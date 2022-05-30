import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError';

export class TaskStatus {
  readonly value: string;
  private statusAllowed = ['todo', 'accepted', 'completed'];

  constructor(value: string) {
    const valueNormalized = value.toLowerCase();
    this.isValid(valueNormalized);
    this.value = valueNormalized;
  }

  private isValid(value: string) {
    if (!this.statusAllowed.includes(value)) {
      throw new InvalidArgumentError(`Status '${value}' invalid, status allowed : 'todo', 'accepted', 'completed' `);
    }
  }
}
