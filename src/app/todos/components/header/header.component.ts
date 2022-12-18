import { Component } from '@angular/core';
import { TodosArrayService } from '../../services/todos-array.service';

@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  text: string = '';
  constructor(private todoService: TodosArrayService) {}

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addTodo(): void {
    console.log('AddTodo');
    this.todoService.addTodo(this.text);
    this.text = '';
  }
}
