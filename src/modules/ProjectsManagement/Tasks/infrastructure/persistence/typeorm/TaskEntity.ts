import { EntitySchema, FindOperator } from 'typeorm';
import { UuidTransformerOrm } from '../../../../../Shared/percistence/typeorm/UuidTransformerOrm';
import { Task } from '../../../domain/Task';
import { TaskStatus } from '../../../domain/TaskStatus';

export const TaskEntitySchema = new EntitySchema<Task>({
  name: 'Task',
  tableName: 'tasks',
  target: Task,
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
    description: {
      type: String
    },
    status: {
      type: String,
      transformer: {
        from: (value: string): TaskStatus => new TaskStatus(value),
        to: (value: any): string | FindOperator<any> => {
          if (value instanceof FindOperator) return value;
          return value.value;
        }
      }
    },
    projectId: {
      type: String,
      transformer: UuidTransformerOrm
    }
  }
});
