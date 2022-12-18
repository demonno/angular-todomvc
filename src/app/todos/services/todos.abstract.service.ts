import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FilterEnum } from '../types/filter.enum';
import { TodoInterface } from '../types/todo.interface';
import { TodosArrayService } from './todos-array.service';
import { TodosSubjectService } from './todos.service';

export function dataServiceFactory() {
    const config = 'array'; // this could be any value, e.g. a value read from a configuration file
    if (config === 'array') {
        return new TodosArrayService();
    } else {
        return new TodosSubjectService();
    }
}


@Injectable({
    providedIn: 'root',
    useFactory: dataServiceFactory
})
export abstract class TodosService {
    todos$!: Observable<TodoInterface[]>;
    filter$!: BehaviorSubject<FilterEnum>;


    abstract addTodo(text: string): void;
    abstract toggleAll(isCompleted: boolean): void;
    abstract changeFilter(filterName: FilterEnum): void;
    abstract changeTodo(id: string, text: string): void;
    abstract removeTodo(id: string): void;
    abstract toggleTodo(id: string): void;
}
