export class ProjectNotExist extends Error {
  constructor(id: string) {
    super(`The Project for id : ${id} does not exists`);
  }
}
