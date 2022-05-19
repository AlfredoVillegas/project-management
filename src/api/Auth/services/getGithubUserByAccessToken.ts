import axios from 'axios';

export async function getGithubUserByAccessToken(accessToken: string) {
  const { data: user } = await axios.get('https://api.github.com/user', {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${accessToken}`
    }
  });

  return user;
}
