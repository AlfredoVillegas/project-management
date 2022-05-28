import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { GithubCredentialFinder } from '../../GithubCredentials/application/GithubCredentialFinder';
import { TypeOrmGithubCredentialRepository } from '../../GithubCredentials/infrastructure/persistence/TypeOrmGithubCredentialRepository';

export async function getGithubCredential(userId: string) {
  // refactorizar a Query Bus
  // refactorizar a Query Bus

  const finderCredentialService = new GithubCredentialFinder(new TypeOrmGithubCredentialRepository());
  const credential = await finderCredentialService.execute(new Uuid(userId));

  return { userName: credential.userName.value, githubToken: credential.githubToken, userId: credential.userId };
}
