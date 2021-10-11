import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos$!: Observable<Todo[]>;

  constructor(
    private todoListService: TodoListService,
    private nzMessageService: NzMessageService
  ) { }

  loadAll = () => {
    this.todos$ = this.todoListService.findAll();
  }

  changeStatus(todo: Todo) {
    this.todoListService.update(todo)
      .subscribe(() => {
        this.todos$ = this.todoListService.findAll();
      });
    this.nzMessageService.info('Changed Status');
  }

  deleteTodo(todo: Todo){
    this.todoListService.delete(todo.id)
      .subscribe(() => {
        this.todos$ = this.todoListService.findAll();
      });
    this.nzMessageService.warning('Todo Deleted');
  }

  cancel(): void {
    this.nzMessageService.info('Click cancelled');
  }

  ngOnInit(): void {
    this.todos$ = this.todoListService.findAll();
  }

}
