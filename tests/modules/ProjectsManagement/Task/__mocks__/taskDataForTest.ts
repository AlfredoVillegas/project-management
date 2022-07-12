import { Uuid } from '../../../../../src/modules/Shared/domain/value-object/Uuid';
import { TaskCreatorParams } from '../../../../../src/modules/ProjectsManagement/Tasks/application/TaskCreator';

export function tasktDataForTest(): TaskCreatorParams {
  return {
    id: Uuid.random().value,
    name: 'example',
    description: 'Description Example',
    projectId: Uuid.random().value
  };
}
