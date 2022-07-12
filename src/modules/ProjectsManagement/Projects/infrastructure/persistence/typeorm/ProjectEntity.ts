import { EntitySchema, FindOperator } from 'typeorm';
import { Uuid } from '../../../../../Shared/domain/value-object/Uuid';
import { UuidTransformerOrm } from '../../../../../Shared/percistence/typeorm/UuidTransformerOrm';
import { Project } from '../../../domain/Project';

export const ProjectEntity = new EntitySchema<Project>({
  name: 'Project',
  tableName: 'projects',
  target: Project,
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
    creator: {
      type: String,
      transformer: UuidTransformerOrm
    },
    collaboratorsIds: {
      type: 'simple-array',
      transformer: {
        from: (value: string[]): Uuid[] => value.map(val => new Uuid(val)),
        to: (value: Uuid[]): string[] | FindOperator<any> => {
          if (value instanceof FindOperator) return value;
          return value.map(val => val.value);
        }
      }
    }
  }
});
