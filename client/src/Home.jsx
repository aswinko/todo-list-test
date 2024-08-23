import React from 'react'
import Create from './Create'
import Todo from './Todo'

const Home = () => {
  return (
    <div className="container">
        <div className="sub-container">
            <h1>Welcome to Todo List</h1>
            <Create />
            <Todo />
        </div>
    </div>
  )
}

export default Home