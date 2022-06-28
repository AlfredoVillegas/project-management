import { ContainerBuilder, Reference } from 'node-dependency-injection';
import { UserDeleter } from '../../../../modules/UserAccess/Users/application/UserDeleter';
import { UserFinderById } from '../../../../modules/UserAccess/Users/application/UserFinderById';
import { TypeOrmUserRepository } from '../../../../modules/UserAccess/Users/infrastructure/persistence/typeorm/TypeOrmUserRepository';

export function registerUsersDependencys(container: ContainerBuilder) {
  container.register('Users.UserRepository', TypeOrmUserRepository);

  const userRepositoryReference = new Reference('Users.UserRepository');
  const eventsBusReference = new Reference('Shared.EventBus');

  container.register(userFinderByIdReference.id, UserFinderById).addArgument(userRepositoryReference);

  container.register(userDeleterReference.id, UserDeleter).addArgument(userRepositoryReference);
}

export const userDeleterReference = new Reference('Users.UserDeleter');

export const userFinderByIdReference = new Reference('Users.UserFinderById');
