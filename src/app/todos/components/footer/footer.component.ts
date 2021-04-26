import { Component } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { TodosService } from "src/app/todos/services/todos.services";
import { FilterEnum } from "../../types/filter.enum";
import { TodoInterface } from "../../types/todos.interface";
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-todos-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})

export class FooterComponent {

    noTodoClass$: Observable<boolean>;
    activeCount$: Observable<number>;
    itemsLeftText$: Observable<string>;
    filter$: Observable<FilterEnum>;
    filterEnum = FilterEnum;

    constructor(private todosService: TodosService) {
        this.activeCount$ = this.todosService.todos$.pipe(
            map((todos) => todos.filter((todo) => !todo.isCompleted).length)
        )

        this.itemsLeftText$ = this.activeCount$.pipe(
            map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`)
        );

        this.noTodoClass$ = this.todosService.todos$.pipe(
            map((todos) => todos.length === 0)
        );

        this.filter$ = this.todosService.filter$;
    }

    changeFilter(event: Event, filterName: FilterEnum): void {
        event.preventDefault();
        this.todosService.changeFilter(filterName);
    }
}