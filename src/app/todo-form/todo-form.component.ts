import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TodoListService } from '../todo-list/todo-list.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  @Input() refresh!: () => void;

  validateForm!: FormGroup;

  submitForm(value: { title: string, completed: boolean}): void {
    for(const key in this.validateForm.controls){
      if(this.validateForm.controls.hasOwnProperty(key)){
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
    value.completed = false;
    this.todoListService.create(value)
      .subscribe(() => {
        this.nzMessageService.info('Todo created');
        this.refresh();
      });
    this.validateForm.reset();
  }

  constructor(private fb: FormBuilder, private todoListService: TodoListService,
    private nzMessageService: NzMessageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]]
    })
  }

}
