import { getConnection } from 'typeorm';
import { User } from '../../../modules/UserAccess/Users/domain/User';

export async function findUserByGithubId(userGithubId: number): Promise<User> {
  const userRepository = getConnection().getRepository(User);
  const user = await userRepository.findOne({ githubId: userGithubId });

  if (!user) {
    throw new Error('user not registered');
  }

  return user;
}
