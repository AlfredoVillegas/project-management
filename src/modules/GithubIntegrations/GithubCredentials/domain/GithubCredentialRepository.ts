import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { GithubCredential } from './GithubCredential';

export interface GithubCredentialRepository {
  save(githubCredential: GithubCredential): Promise<void>;
  findByUser(userId: Uuid): Promise<GithubCredential | null | undefined>;
  updateToken(userId: Uuid, githubToken: string): Promise<void>;
}
