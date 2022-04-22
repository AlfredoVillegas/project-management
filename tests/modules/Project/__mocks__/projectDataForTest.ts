import { ProjectParams } from '../../../../src/modules/Projects/application/ProjectCreator';
import { Uuid } from '../../../../src/modules/Shared/domain/value-object/Uuid';

export function projectDataForTest(): ProjectParams {
  return {
    id: Uuid.random().value,
    name: 'example',
    description: 'Description Example',
    creator: Uuid.random().value,
    collaboratorsIds: [Uuid.random().value, Uuid.random().value]
  };
}
