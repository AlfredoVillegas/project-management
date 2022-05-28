export class GithubRepositoryLocalNotFound extends Error {
  constructor(projectId: string) {
    super(`Local Github Repository of projectId: ${projectId} not Found`);
  }
}
