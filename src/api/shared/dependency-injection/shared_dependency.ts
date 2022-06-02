import { ContainerBuilder } from 'node-dependency-injection';
import { InMemoryAsyncEventBus } from '../../../modules/Shared/infrastructure/EventBus/InMemoryAsyncEventBus';

export function registerSharedDependencys(container: ContainerBuilder) {
  container.register('Shared.EventBus', InMemoryAsyncEventBus);
}
