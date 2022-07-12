import { EntitySchema, FindOperator } from 'typeorm';
import { Uuid } from '../../../../../Shared/domain/value-object/Uuid';
import { ChecklistItem } from '../../../domain/ChecklistItem';

export interface ChecklistItemProps {
  id: Uuid;
  name: string;
  isVerified: boolean;
  checklistId: Uuid;
}

export const ChecklistItemEntity = new EntitySchema<ChecklistItemProps>({
  name: 'ChecklistItem',
  tableName: 'checklist_item',
  target: ChecklistItem,
  schema: 'projects_managements',

  columns: {
    id: {
      type: String,
      primary: true,
      transformer: {
        from: (value: any): any => {
          if (!value) return value;
          return new Uuid(value);
        },
        to: (value: Uuid): string | FindOperator<any> => {
          if (value instanceof FindOperator) return value;
          return value.value;
        }
      } // UuidTransformerOrm
    },
    name: {
      type: String
    },
    isVerified: {
      type: Boolean,
      name: 'is_verified'
    },
    checklistId: {
      type: String,
      name: 'checklist_id',
      transformer: {
        from: (value: string): any => {
          if (!value) return value;
          return new Uuid(value);
        },
        to: (value: Uuid): string | FindOperator<any> => {
          if (!value) return value;
          if (value instanceof FindOperator) return value;
          return value.value;
        }
      },
      select: false
    }
  },
  relations: {
    checklistId: {
      type: 'many-to-one',
      target: 'Checklist',
      joinColumn: { name: 'checklist_id', referencedColumnName: 'id' },
      inverseSide: 'items',
      onDelete: 'CASCADE'
    }
  }
});
