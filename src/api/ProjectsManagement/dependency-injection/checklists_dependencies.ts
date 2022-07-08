import { ContainerBuilder, Reference } from 'node-dependency-injection';
import { ChecklistCreator } from '../../../modules/ProjectsManagement/CheckLists/application/ChecklistCreator';
import { ChecklistDeleter } from '../../../modules/ProjectsManagement/CheckLists/application/ChecklistDeleter';
import { ChecklistItemAggregator } from '../../../modules/ProjectsManagement/CheckLists/application/ChecklistItemAggregator';
import { ChecklistItemDeleter } from '../../../modules/ProjectsManagement/CheckLists/application/ChecklistItemDeleter';
import { ChecklistsByTaskIdFinder } from '../../../modules/ProjectsManagement/CheckLists/application/Find/ChecklistsByTaskIdFinder';
import { ChecklistItemIsVerifiedUpdater } from '../../../modules/ProjectsManagement/CheckLists/application/Update/ChecklistItemIsVerifiedUpdater';
import { ChecklistItemRenamer } from '../../../modules/ProjectsManagement/CheckLists/application/Update/ChecklistItemRenamer';
import { ChecklistRenamer } from '../../../modules/ProjectsManagement/CheckLists/application/Update/ChecklistRenamer';
import { TypeOrmChecklistRepository } from '../../../modules/ProjectsManagement/CheckLists/infrastructure/persistence/TypeOrmChecklistRepository';
import { ChecklistDeleteController } from '../Checklists/controllers/ChecklistDeleteController';
import { ChecklistItemDeleteController } from '../Checklists/controllers/ChecklistItemDeleteController';
import { ChecklistItemIsVerifiedPutController } from '../Checklists/controllers/ChecklistItemIsVerifiedPutController';
import { ChecklistItemNamePutController } from '../Checklists/controllers/ChecklistItemNamePutController';
import { ChecklistItemPostController } from '../Checklists/controllers/ChecklistItemPostController';
import { ChecklistNamePutController } from '../Checklists/controllers/ChecklistNamePutController';
import { ChecklistPostController } from '../Checklists/controllers/ChecklistPostController';
import { ChecklistsByTaskGetController } from '../Checklists/controllers/ChecklistsByTaskGetController';

export function registerChecklistDependencies(container: ContainerBuilder) {
  const checklistRepositoryReference = new Reference('ProjectsManagement.checklists.ChecklistRepository');
  const eventsBusReference = new Reference('Shared.EventBus');

  container.register(checklistRepositoryReference.id, TypeOrmChecklistRepository);

  container
    .register('ProjectsManagement.checklists.ChecklistCreator', ChecklistCreator)
    .addArgument(checklistRepositoryReference);
  //.addArgument(eventsBusReference);

  container
    .register('ProjectsManagement.checklists.ChecklistItemAggregator', ChecklistItemAggregator)
    .addArgument(checklistRepositoryReference);

  container
    .register('ProjectsManagement.checklists.ChecklistItemIsVerifiedUpdater', ChecklistItemIsVerifiedUpdater)
    .addArgument(checklistRepositoryReference);

  container
    .register('ProjectsManagement.checklists.ChecklistRenamer', ChecklistRenamer)
    .addArgument(checklistRepositoryReference);

  container
    .register('ProjectsManagement.checklists.ChecklistItemRenamer', ChecklistItemRenamer)
    .addArgument(checklistRepositoryReference);

  container
    .register('ProjectsManagement.checklists.ChecklistByTaskFinder', ChecklistsByTaskIdFinder)
    .addArgument(checklistRepositoryReference);

  container
    .register('ProjectsManagement.checklists.ChecklistDeleter', ChecklistDeleter)
    .addArgument(checklistRepositoryReference);

  container
    .register('ProjectsManagement.checklists.ChecklistItemDeleter', ChecklistItemDeleter)
    .addArgument(checklistRepositoryReference);
}

export function registerChecklistControllersDependencies(container: ContainerBuilder) {
  // Checklist Controllers
  container
    .register('Api.ProjectsManagement.controllers.ChecklistPostController', ChecklistPostController)
    .addArgument(new Reference('ProjectsManagement.checklists.ChecklistCreator'));

  container
    .register('Api.ProjectsManagement.controllers.ChecklistItemPostController', ChecklistItemPostController)
    .addArgument(new Reference('ProjectsManagement.checklists.ChecklistItemAggregator'));

  container
    .register(
      'Api.ProjectsManagement.controllers.ChecklistItemIsVerifiedPutController',
      ChecklistItemIsVerifiedPutController
    )
    .addArgument(new Reference('ProjectsManagement.checklists.ChecklistItemIsVerifiedUpdater'));

  container
    .register('Api.ProjectsManagement.controllers.ChecklistNamePutController', ChecklistNamePutController)
    .addArgument(new Reference('ProjectsManagement.checklists.ChecklistRenamer'));

  container
    .register('Api.ProjectsManagement.controllers.ChecklistItemNamePutController', ChecklistItemNamePutController)
    .addArgument(new Reference('ProjectsManagement.checklists.ChecklistItemRenamer'));

  container
    .register('Api.ProjectsManagement.controllers.ChecklistsByTaskGetController', ChecklistsByTaskGetController)
    .addArgument(new Reference('ProjectsManagement.checklists.ChecklistByTaskFinder'));

  container
    .register('Api.ProjectsManagement.controllers.ChecklistDeleteController', ChecklistDeleteController)
    .addArgument(new Reference('ProjectsManagement.checklists.ChecklistDeleter'));

  container
    .register('Api.ProjectsManagement.controllers.ChecklistItemDeleteController', ChecklistItemDeleteController)
    .addArgument(new Reference('ProjectsManagement.checklists.ChecklistItemDeleter'));
}
