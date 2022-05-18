import { EntitySchema } from 'typeorm';
import { UuidTransformerOrm } from '../../../../../Shared/percistence/typeorm/UuidTransformerOrm';
import { GithubCredential } from '../../../domain/GithubCredential';

export const GithubCredentialsEntity = new EntitySchema<GithubCredential>({
  name: 'GithubCredential',
  tableName: 'github_credentials',
  target: GithubCredential,
  columns: {
    userId: {
      type: String,
      primary: true,
      transformer: UuidTransformerOrm
    },
    githubToken: {
      type: String
    }
  }
});
