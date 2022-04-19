export class TaskNotExist extends Error {
  constructor(id: string) {
    super(`Task whit id: ${id} does not exists`);
  }
}
