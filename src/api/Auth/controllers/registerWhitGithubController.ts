import axios from 'axios';
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { GithubCredential } from '../../../modules/GithubIntegrations/GithubCredentials/domain/GithubCredential';
import { GithubCredentialUserName } from '../../../modules/GithubIntegrations/GithubCredentials/domain/GithubCredentialUserName';
import { Uuid } from '../../../modules/Shared/domain/value-object/Uuid';
import { UserRegister } from '../../../modules/Users/application/UserRegister';
import { responseError, responseSuccess } from '../../shared/network/response';
import { createToken } from '../services/createToken';
import { getAccessToken } from '../services/getAccessToken';
import { getGithubUserByAccessToken } from '../services/getGithubUserByAccessToken';

export class RegisterWhitGithubController {
  constructor(private userRegisterService: UserRegister) {}

  async execute(req: Request, res: Response) {
    const { code } = req.query;

    try {
      const githubAccessToken = await getAccessToken(code);

      const githubUserData = await getGithubUserByAccessToken(githubAccessToken);

      if (!githubUserData.email) {
        githubUserData.email = await this.getGithubEmail(githubAccessToken);
      }

      const userId = Uuid.random();
      const user = {
        id: userId.value,
        githubId: githubUserData.id,
        name: githubUserData.name,
        email: githubUserData.email
      };
      await this.userRegisterService.run(user);

      const githubCrendetialsRepository = getConnection().getRepository(GithubCredential);

      const githubCredentialUserName = new GithubCredentialUserName(user.name);
      const credential = new GithubCredential(userId, githubCredentialUserName, githubAccessToken);
      await githubCrendetialsRepository.insert(credential);

      const tokenJwt = createToken(userId.value);

      return responseSuccess(res, 200, { tokenJwt });
    } catch (error: any) {
      responseError(res, 401, error.message);
    }
  }

  private async getGithubEmail(githubAccessToken: string): Promise<string> {
    const { data } = await axios.get('https://api.github.com/user/emails', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${githubAccessToken}`
      }
    });

    const emailsData = data as any[];
    return emailsData.find(email => email.primary === true).email;
  }
}
