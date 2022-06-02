import { ContainerBuilder } from 'node-dependency-injection';
import { registerProjectsManagementDependencys } from '../../ProjectsManagement/dependency-injection/index_dependency';
import { registerSharedDependencys } from './shared_dependency';

const container = new ContainerBuilder();

registerSharedDependencys(container);
registerProjectsManagementDependencys(container);

console.log('fin: loader dependencys');

export default container;
