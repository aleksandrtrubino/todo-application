import React, { useState } from 'react'

export const TodoForm = ({addTodo}) => {
    const [input, setInput] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(input)
        setInput('')
    }
    
  return (
    <form onSubmit={handleSubmit}>
        <input type='text' 
        className='TodoFormInput'
        placeholder='Your task'
        value={input}
        onChange={(e) => setInput(e.target.value)}/>

        <button type='submit'> Add task</button>
    </form>
  )
}
