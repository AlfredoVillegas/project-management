export class NotHaveCreatePermission extends Error {
  constructor(userId: string, projectId: string) {
    super(`User: - ${userId} -, is not creator of this project : ${projectId}} `);
  }
}
