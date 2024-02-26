package com.trubino.tasks.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    @Autowired
    TodoRepository todoRepository;

    public List<Todo> findAllTodos(){
        return todoRepository.findAll();
    }

    public Optional<Todo> findTodoById(Long id){
        return todoRepository.findById(id);
    }

    public void deleteAllTodos(){
        todoRepository.deleteAll();
    }

    public void deleteTodoById(Long id){
        todoRepository.deleteById(id);
    }

    public Todo saveTodo(Todo todo){
        return todoRepository.save(todo);
    }
}
