import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class GithubCredential {
  constructor(readonly userId: Uuid, readonly githubToken: string) {}
}
