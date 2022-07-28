import { FindOperator } from 'typeorm';
import { Uuid } from '../../domain/value-object/Uuid';

export const UuidTransformerOrm = {
  from: (value: string): Uuid | undefined => {
    if (value) {
      return new Uuid(value);
    }
  },
  to: (value: Uuid): string | FindOperator<any> | undefined => {
    if (value instanceof FindOperator) return value;
    if (value) return value.value;
  }
};
