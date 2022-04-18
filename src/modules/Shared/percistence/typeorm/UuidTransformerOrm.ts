import { FindOperator } from 'typeorm';
import { Uuid } from '../../domain/value-object/Uuid';

export const UuidTransformerOrm = {
  from: (value: string): Uuid => new Uuid(value),
  to: (value: Uuid): string | FindOperator<any> => {
    if (value instanceof FindOperator) return value;
    return value.value;
  }
};
