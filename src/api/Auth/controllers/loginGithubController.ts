import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { GithubCredential } from '../../../modules/GithubIntegrations/GithubCredentials/domain/GithubCredential';
import { User } from '../../../modules/UserAccess/Users/domain/User';
import { responseError, responseSuccess } from '../../shared/network/response';
import { createToken } from '../services/createToken';
import { getAccessToken } from '../services/getAccessToken';
import { getGithubUserByAccessToken } from '../services/getGithubUserByAccessToken';

export class LoginGithubController {
  constructor() {}
  async execute(req: Request, res: Response) {
    console.log('Login whit github...');
    const { code } = req.query;

    try {
      const githubAccessToken = await getAccessToken(code);

      const githubUserData = await getGithubUserByAccessToken(githubAccessToken);

      const user = await findUserByGithubId(githubUserData.id);

      const githubCrendetialsRepository = getConnection().getRepository(GithubCredential);
      await githubCrendetialsRepository.update({ userId: user.id }, { githubToken: githubAccessToken });

      const tokenJwt = createToken(user.id.value);

      return responseSuccess(res, 200, { tokenJwt });
    } catch (error: any) {
      responseError(res, 401, error.message);
    }
  }
}

async function findUserByGithubId(userGithubId: number): Promise<User> {
  const userRepository = getConnection().getRepository(User);
  const user = await userRepository.findOne({ githubId: userGithubId });

  if (!user) {
    throw new Error('user not registered');
  }

  return user;
}
