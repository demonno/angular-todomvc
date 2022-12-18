import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';
import { TodosArrayService } from '../../services/todos-array.service';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  noTodosClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemsLeftText$: Observable<string>;
  filter$: Observable<FilterEnum>;
  filterEnum = FilterEnum;

  constructor(private todoService: TodosArrayService) {
    this.activeCount$ = this.todoService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );
    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`)
    );
    this.noTodosClass$ = this.todoService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    this.filter$ = this.todoService.filter$;
  }

  changeFilter(event: MouseEvent, filterName: FilterEnum): void {
    event.preventDefault();
    this.todoService.changeFilter(filterName);
  }
}
