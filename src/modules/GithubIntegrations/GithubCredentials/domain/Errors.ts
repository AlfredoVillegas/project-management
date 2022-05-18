export class GithubCredentialNotExist extends Error {
  constructor(userId: string) {
    super(`user: "${userId}" not have gitbuh access token`);
  }
}
