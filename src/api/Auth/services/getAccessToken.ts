import axios from 'axios';

export async function getAccessToken(code: any): Promise<string> {
  const { data: dataAccessToken } = await axios.get('https://github.com/login/oauth/access_token', {
    params: {
      client_id: process.env.GITHUB_CLIENT_ID || 'dev',
      client_secret: process.env.GITHUB_CLIENT_SECRET || 'dev',
      code: code
    },
    headers: {
      Accept: 'application/json'
    }
  });

  if (!dataAccessToken.access_token) {
    throw new Error(`${dataAccessToken.error}`);
  }

  return dataAccessToken.access_token;
}
