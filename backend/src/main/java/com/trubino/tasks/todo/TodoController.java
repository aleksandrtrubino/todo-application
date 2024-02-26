package com.trubino.tasks.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000/", methods = {RequestMethod.PUT,RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE})
@RequestMapping("/api/v1/todos")
public class TodoController {

    @Autowired
    TodoService todoService;

    @GetMapping
    public ResponseEntity<?> findAllTodos(){
        List<Todo> todos = todoService.findAllTodos();
        return ResponseEntity.status(HttpStatus.OK).body(todos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findTodoById(@PathVariable Long id){
        Optional<Todo> todo = todoService.findTodoById(id);
        if(todo.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        else
            return ResponseEntity.status(HttpStatus.OK).body(todo.get());
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAllTodos(){
        todoService.deleteAllTodos();
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTodoById(@PathVariable Long id){
        todoService.deleteTodoById(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping
    public ResponseEntity<?> saveTodo(@RequestBody Todo todo){
        return ResponseEntity.status(HttpStatus.OK).body(todoService.saveTodo(todo));
    }

}
