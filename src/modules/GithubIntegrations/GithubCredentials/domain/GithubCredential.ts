import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { GithubCredentialUserName } from './GithubCredentialUserName';

export class GithubCredential {
  constructor(readonly userId: Uuid, readonly userName: GithubCredentialUserName, readonly githubToken: string) {}
}
