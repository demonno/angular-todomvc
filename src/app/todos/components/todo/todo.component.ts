import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { TodosArrayService } from '../../services/todos-array.service';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit, OnChanges {
  @Input('todo') todoProps!: TodoInterface;
  @Input('isEditing') isEditingProps: boolean = false;
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> =
    new EventEmitter();
  editingText: string = '';
  @ViewChild('textInput') textInput: ElementRef | null | undefined;

  constructor(private todoService: TodosArrayService) {}

  ngOnInit(): void {
    this.editingText = this.todoProps.text;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditingProps'].currentValue) {
      setTimeout(() => {
        this.textInput?.nativeElement.focus();
      });
    }
  }

  setTodoInEditMode(): void {
    console.log('setTodoInEditMode');
    this.setEditingIdEvent.emit(this.todoProps.id);
  }

  removeTodo() {
    this.todoService.removeTodo(this.todoProps.id);
  }

  toggleTodo() {
    this.todoService.toggleTodo(this.todoProps.id);
  }

  changeText(event: Event): void {
    this.editingText = (event.target as HTMLInputElement).value;
  }

  changeTodo() {
    this.todoService.changeTodo(this.todoProps.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }
}
