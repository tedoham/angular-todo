import { Component, NgModule } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { TodosService } from "src/app/todos/services/todos.services";
import { FilterEnum } from "../../types/filter.enum";
import { TodoInterface } from "../../types/todos.interface";
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-todos-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})

export class MainComponent {
    visibleTodos$: Observable<TodoInterface[]>;
    noTodoClass$: Observable<boolean>;
    isAllTodoSelected$: Observable<boolean>;
    editingId: string | null = null;

    constructor(private todosService: TodosService) {

        this.isAllTodoSelected$ = this.todosService.todos$.pipe(
            map((todos) => todos.every((todo) => todo.isCompleted))
        );

        this.noTodoClass$ = this.todosService.todos$.pipe(
            map((todos) => todos.length === 0)
        );

        this.visibleTodos$ = combineLatest(
            [
                this.todosService.todos$,
                this.todosService.filter$
            ]
        ).pipe(
            map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
                if (filter === FilterEnum.active) {
                    return todos.filter((todo) => !todo.isCompleted);
                }
                else if (filter === FilterEnum.completed) {
                    return todos.filter((todo) => todo.isCompleted);
                }
                return todos;
            })
        );
    }

    toggleAllTodos(event: Event): void {
        const target = event.target as HTMLInputElement
        this.todosService.toggleAll(target.checked)
    }

    setEditingId(editingId: string | null): void {
        this.editingId = editingId;
    }
}