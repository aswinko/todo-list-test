import React, { useState } from 'react'

const Todo = () => {
  const [todos, setTodos] = useState([])

  return (
    <div className="todo">
      {todos.length === 0 ? (
        <div>No record found!</div>
      ) : (
        todos.map((item, index) => (
          <div className="todo-list">
            <p>{item}</p>
            <div>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Todo
