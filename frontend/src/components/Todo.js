import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faCheck, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'


export const Todo = ({todo, editTodo, removeTodo}) => {
  const [edited, setEdited] = useState(false)
  const [input, setInput] = useState(todo.description)

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(todo.id, input ,todo.completed)
    setEdited(false)
  }

  return (
    <div className='todo-div'>
      {
        edited?
        <form onSubmit={handleSubmit}>
          <input className='todo-input' type='text' placeholder='Your task' value={input} onChange={(e) => setInput(e.target.value)} />
          <button className='hidden-button' type='submit'>
            <FontAwesomeIcon className='todo-icon' id='submitCheckIcon' icon={faCheck}/>
          </button>
        </form>
        :
        <>
        {
          todo.completed ?
        <FontAwesomeIcon className='todo-icon' id='checkIcon' icon={faCheckSquare} checked={todo.completed} onClick={()=>editTodo(todo.id, todo.description, !todo.completed)}/>
        :
        <FontAwesomeIcon className='todo-icon' id='checkIcon' icon={faSquare} checked={todo.completed} onClick={()=>editTodo(todo.id, todo.description, !todo.completed)}/>
        }
        <span id='todoDecsription'> {todo.description}</span>
        <FontAwesomeIcon className='todo-icon' id='editIcon' icon ={faPenToSquare} onClick={()=>setEdited(true)}/>
        <FontAwesomeIcon className='todo-icon' id='removeIcon' icon ={faTrash} onClick={()=>removeTodo(todo.id)}/>
        </>
      }
    </div>
  )
}

