import { Uuid } from '../../../../../src/modules/Shared/domain/value-object/Uuid';
import { TaskCreatorParams } from '../../../../../src/modules/ProjectsManagement/Tasks/application/TaskCreator';

export function tasktDataForTest(): TaskCreatorParams {
  return {
    id: Uuid.random().value, //'03301545-828a-4e4d-a086-f823f48c53b5',
    name: 'example',
    description: 'Description Example',
    projectId: Uuid.random().value
    //taskDependent: undefined
  };
}
