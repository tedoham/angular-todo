import { Component } from "@angular/core";
import { TodosService } from "src/app/todos/services/todos.services";

@Component({
    selector: 'app-todos-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {
    text: string = '';

    constructor(private todoService: TodosService) {
        this.todoService.todos$.subscribe((todos) => {
            console.log('todos', todos);
        });
    }
    
    changeText(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.text = target.value;
        // console.log(target.value);
    }

    addTodo(): void {
        console.log('addTodo', this.text);
        this.todoService.addTodo(this.text);
        this.text = '';
    }
}