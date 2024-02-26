import './TodoPage.css'
import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios';

import { ErrorComponent } from './ErrorComponent';
import { TodoForm } from './TodoForm'
import { Todo } from './Todo';



export const TodoPage = () => {

    const [todos, setTodos] = useState([]);
    const [hasError, setHasError] = useState(false);



    // useEffect(() => {
    //     fetch("http://localhost:8080/api/v1/todos", {
    //         method: "GET"
    //     })
    //     .then(response => response.json())
    //     .then(
    //         data => setTodos(data.sort((a,b)=> a.id - b.id)),
    //         console.log("todos updated")
    //     )
    // }, []);

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/todos")
        .then(response =>{
            setTodos(response.data.sort((a,b)=> a.id - b.id))
            console.log("todos updated")
        })
        .catch((e)=>{
           setHasError(true)
        })
    }, []);



    // const addTodo = (description) =>{
    //     fetch("http://localhost:8080/api/v1/todos", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             description: description,
    //             completed: false,
    //          }),
    //          headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //          },
    //     })
    //     .then(response => response.json())
    //     .then(
    //         data => setTodos([
    //         ...todos, 
    //         {id: data.id, description: data.description, completed: data.completed},
    //         ]),
    //         console.log("new todo added")
    //     );
    // }

    const addTodo = (description) =>{
        axios.post("http://localhost:8080/api/v1/todos", 
        {
            description: description, 
            completed: false
        })
        .then(response=> {
            setTodos(
                [
                    ...todos, 
                    {
                        id: response.data.id, 
                        description: response.data.description, 
                        completed: response.data.completed
                    }
                ])
            console.log("new todo added")
        })
        .catch((e)=>{
            setHasError(true)
         })

    }

    // const editTodo = (id, description, completed) => {
    //     fetch("http://localhost:8080/api/v1/todos", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             id: id,
    //             description: description,
    //             completed: completed,
    //          }),
    //          headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //          },
    //     })
    //     .then(response => response.json())
    //     .then(data => setTodos(
    //         todos.map((todo) =>
    //         todo.id === data.id ? {...todo, description: data.description, completed: data.completed}: todo
    //         ),
    //         console.log("todo edited")
    //     ));
    // }

    const editTodo = (id, description, completed) => {
        axios.post("http://localhost:8080/api/v1/todos", {
            id: id,
            description: description,
            completed: completed,
        })
        .then(response => response.data)
        .then(data => {
            setTodos(todos => 
                todos.map((todo) =>
                    todo.id === data.id ? {
                        ...todo,
                        description: data.description,
                        completed: data.completed
                    } : todo
                )
            );
            console.log("todo edited");
        })
        .catch((e)=>{
            setHasError(true)
         })
    }
    

    // const removeTodo = (id) =>{
    //     fetch(`http://localhost:8080/api/v1/todos/${id}`, {
    //         method: "DELETE"
    //     })
    //     .then(setTodos(current =>current.filter(todo => todo.id !== id),
    //     console.log("todo removed")
    //     ));
    // }

    const removeTodo = (id) =>{
        axios.delete(`http://localhost:8080/api/v1/todos/${id}`)
        .then(()=>
            {
                setTodos(current =>current.filter(todo => todo.id !== id))
                console.log("todo removed")
            }  
        )
        .catch((e)=>{
            setHasError(true)
         })
    }

    return (
        <div id='todoPage'>
          {hasError ? (
            <ErrorComponent />
          ) : (
            <>
              <TodoForm addTodo={addTodo} />
              {todos.map((todo) => (
                <Todo key={todo.id} todo={todo} editTodo={editTodo} removeTodo={removeTodo} />
              ))}
            </>
          )}
        </div>
      )
}



