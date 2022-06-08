import { ContainerBuilder } from 'node-dependency-injection';
import { registerAuthControllersDependencys } from '../../Auth/dependency-injection/controllers_dependency';
import { registerProjectsManagementDependencys } from '../../ProjectsManagement/dependency-injection/index_dependency';
import { registerUsersModuleDependencys } from '../../Users/dependency-injection/index_dependency';
import { registerSharedDependencys } from './shared_dependency';

const container = new ContainerBuilder();

registerSharedDependencys(container);
registerProjectsManagementDependencys(container);
registerAuthControllersDependencys(container);
registerUsersModuleDependencys(container);

console.log('fin: loader dependencys');

export default container;
