import React, { useState } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'

const Todo = ({ todos, deleteTask, editTask }) => {
  const [editing, setEditing] = useState(null)
  const [newTask, setNewTask] = useState('')

  const startEditing = (task) => {
    setEditing(task._id)
    setNewTask(task.task)
  }

  const handleEdit = (taskId) => {
    editTask(taskId, newTask)
    setEditing(null)
  }

  return (
    <div className="todo">
      {todos.length === 0 ? (
        <div>No record found!</div>
      ) : (
        todos.map((task) => (
          <div className="todo-list" key={task.id}>
            {editing === task._id ? (
              <div>
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={() => handleEdit(task._id)}>Save</button>
              </div>
            ) : (
              <div>
                <p>{task.task}</p>
                <div>
                  <button onClick={() => startEditing(task)}>Edit</button>
                  <button onClick={() => deleteTask(task._id)}>
                    <BsFillTrashFill />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default Todo
