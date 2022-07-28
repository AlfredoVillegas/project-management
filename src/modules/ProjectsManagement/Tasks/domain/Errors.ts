export class TaskNotExist extends Error {
  constructor(id: string) {
    super(`Task whit id: ${id} does not exists`);
  }
}

export class DependencyNotCompleted extends Error {
  constructor() {
    super('The task is dependent on an uncompleted task');
  }
}
