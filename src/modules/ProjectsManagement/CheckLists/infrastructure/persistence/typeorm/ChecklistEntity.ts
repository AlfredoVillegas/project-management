import { EntitySchema } from 'typeorm';
import { UuidTransformerOrm } from '../../../../../Shared/percistence/typeorm/UuidTransformerOrm';
import { Checklist } from '../../../domain/Checklist';

//<Checklist>
export const ChecklistEntity = new EntitySchema<any>({
  name: 'Checklist',
  tableName: 'checklist',
  target: Checklist,
  schema: 'projects_managements',

  columns: {
    id: {
      type: String,
      primary: true,
      transformer: UuidTransformerOrm
    },
    name: {
      type: String
    },
    taskId: {
      type: String,
      name: 'task_id',
      transformer: UuidTransformerOrm
    },
    totalItemsVerified: {
      type: Number,
      name: 'total_items_verified'
    },
    advancedPercentage: {
      type: Number,
      name: 'advance_percentage'
    }
  },

  relations: {
    items: {
      type: 'one-to-many',
      target: 'ChecklistItem', // ChecklistItemEntity
      eager: true,
      cascade: true,
      nullable: true,
      inverseSide: 'checklistId'
      //cascade: ['insert', 'update'],
    }
  }
});
