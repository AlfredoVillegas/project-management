import { Request, Response } from 'express';
import { GithubCredentialTokenUpdater } from '../../../modules/GithubIntegrations/GithubCredentials/application/GithubCredentialTokenUpdater';
import { responseError, responseSuccess } from '../../shared/network/response';
import { createToken } from '../services/createToken';
import { findUserByGithubId } from '../services/findUserByGithubId';
import { getAccessToken } from '../services/getAccessToken';
import { getGithubUserByAccessToken } from '../services/getGithubUserByAccessToken';

export class LoginGithubController {
  constructor(private credentialUpdater: GithubCredentialTokenUpdater) {}

  async execute(req: Request, res: Response) {
    const { code } = req.query;

    try {
      const githubAccessToken = await getAccessToken(code);

      const githubUserData = await getGithubUserByAccessToken(githubAccessToken);

      const user = await findUserByGithubId(githubUserData.id);

      await this.credentialUpdater.execute(user.id, githubAccessToken);

      const tokenJwt = createToken(user.id.value);

      responseSuccess(res, 200, { name: user.name, tokenJwt });
    } catch (error: any) {
      responseError(res, 401, error.message);
    }
  }
}
