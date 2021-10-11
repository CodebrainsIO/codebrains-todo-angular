export class Todo {
  constructor(
    public id?: number,
    public title?: string,
    public completed?: boolean,
  ){
    this.completed = false;
  }
}
