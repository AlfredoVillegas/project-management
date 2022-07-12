import { EntitySchema } from 'typeorm';
import { UuidTransformerOrm } from '../../../../../Shared/percistence/typeorm/UuidTransformerOrm';
import { GithubCredential } from '../../../domain/GithubCredential';
import { GithubCredentialUserName } from '../../../domain/GithubCredentialUserName';

export const GithubCredentialsEntity = new EntitySchema<GithubCredential>({
  name: 'GithubCredential',
  tableName: 'github_credentials',
  target: GithubCredential,
  schema: 'github_integrations',
  columns: {
    userId: {
      type: String,
      primary: true,
      transformer: UuidTransformerOrm
    },
    userName: {
      type: String,
      transformer: {
        from: (value: string): GithubCredentialUserName => new GithubCredentialUserName(value),
        to: (value: GithubCredentialUserName): string => value.value
      }
    },
    githubToken: {
      type: String
    }
  }
});
