import React, { useState, useEffect } from 'react'
import Create from './Create'
import Todo from './Todo'

const App = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch('http://localhost:2000/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err))
  }, [])

  const addTask = (task) => {
    fetch('http://localhost:2000/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
    })
      .then(() => {
        setTodos((prevTodos) => [...prevTodos, { task }])
      })
      .catch((err) => console.log(err))
  }

  const editTask = (taskId, updatedTask) => {
    fetch(`http://localhost:2000/edit/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: updatedTask }),
    })
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.map((task) =>
            task._id === taskId ? { ...task, task: updatedTask } : task,
          ),
        )
      })
      .catch((err) => console.log(err))
  }

  const deleteTask = (taskId) => {
    fetch(`http://localhost:2000/delete/${taskId}`, { method: 'DELETE' })
      .then(() => {
        setTodos((items) => items.filter((item) => item._id !== taskId))
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="container">
      <div className="sub-container">
        <h1>Welcome to Todo List</h1>
        <Create addTask={addTask} />
        <Todo todos={todos} deleteTask={deleteTask} editTask={editTask} />
      </div>
    </div>
  )
}

export default App
