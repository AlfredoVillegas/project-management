import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { GithubCredential } from './GithubCredential';

export interface GithubCredentialRepository {
  findByUser(userId: Uuid): Promise<GithubCredential | null | undefined>;
}
