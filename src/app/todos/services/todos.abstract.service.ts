import { FilterEnum } from '../types/filter.enum';

export abstract class TodosService {
    abstract addTodo(text: string): void;
    abstract toggleAll(isCompleted: boolean): void;
    abstract changeFilter(filterName: FilterEnum): void;
    abstract changeTodo(id: string, text: string): void;
    abstract removeTodo(id: string): void;
    abstract toggleTodo(id: string): void;
}
