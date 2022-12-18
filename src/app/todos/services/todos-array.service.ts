import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { TodoInterface } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';
import { TodosService } from './todos.abstract.service';

@Injectable()
export class TodosArrayService implements TodosService {
  private todoStorage: TodoInterface[] = [];
  private todoSubject = new BehaviorSubject<TodoInterface[]>([]);
  todos$: Observable<TodoInterface[]> = this.todoSubject.asObservable();
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  constructor() {
    console.log("TodosArrayService is used as backend");

  }
  addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16),
    };
    this.todoStorage = [...this.todoStorage, newTodo];
    this.todoSubject.next(this.todoStorage);
  }

  toggleAll(isCompleted: boolean): void {
    const updatedTodos = this.todoStorage.map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });
    this.todoStorage = updatedTodos;
    this.todoSubject.next(updatedTodos);
  }

  changeFilter(filterName: FilterEnum): void {
    this.filter$.next(filterName);
  }

  changeTodo(id: string, text: string): void {
    const updatedTodos = this.todoStorage.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        };
      }
      return todo;
    });
    this.todoStorage = updatedTodos;
    this.todoSubject.next(updatedTodos);
  }

  removeTodo(id: string): void {
    const updatedTodos = this.todoStorage.filter((todo) => todo.id != id);
    this.todoSubject.next(updatedTodos);
  }

  toggleTodo(id: string): void {
    const updatedTodos = this.todoStorage.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    this.todoStorage = updatedTodos;
    this.todoSubject.next(updatedTodos);
  }
}
