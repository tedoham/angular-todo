import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from "@angular/core";
import { TodosService } from "../../services/todos.services";
import { TodoInterface } from "../../types/todos.interface";

@Component({
    selector: 'app-todos-todo',
    templateUrl: './todo.component.html'
})

export class TodoComponent implements OnInit, OnChanges {
    @Input('todo') todoProps!: TodoInterface;
    @Input('isEditing') isEditingProps!: boolean;
    @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> = new EventEmitter();

    editingText: string = '';
    @ViewChild('textInput') textInput!: ElementRef;

    constructor(private todoService: TodosService) {}
   
    ngOnInit(): void {
        this.editingText = this.todoProps.text;
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.isEditingProps.currentValue) {
            setTimeout(() => {
                this.textInput.nativeElement.focus();
            }, 0);
        }
    }

    setTodoInEditMode(): void {
        console.log("setTodoInEditMode");
        this.setEditingIdEvent.emit();
    }

    removeTodo(): void {
        console.log("removeTodo");
       this.todoService.removeTodo(this.todoProps.id); 
    }

    toggleTodo(): void {
        console.log("toggleTodo");
        this.todoService.toggleTodo(this.todoProps.id); 
    }

    changeText(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.editingText = value;
        console.log("changeText")
    }

    changeTodo(): void {
        console.log("changeTodo")
        this.todoService.changeTodo(this.todoProps.id, this.editingText);
        this.setEditingIdEvent.emit(null);
    }
}