import { ContainerBuilder, Reference } from 'node-dependency-injection';
import { UserDeleter } from '../../../modules/Users/application/UserDeleter';
import { TypeOrmUserRepository } from '../../../modules/Users/infrastructure/persistence/typeorm/TypeOrmUserRepository';

export function registerUsersDependencys(container: ContainerBuilder) {
  container.register('Users.UserRepository', TypeOrmUserRepository);

  const userRepositoryReference = new Reference('Users.UserRepository');
  const eventsBusReference = new Reference('Shared.EventBus');

  container.register(userDeleterReference.id, UserDeleter).addArgument(userRepositoryReference);
}

export const userDeleterReference = new Reference('Users.UserDeleter');
