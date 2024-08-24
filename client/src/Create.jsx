import React, { useState } from 'react';

const Create = ({ addTask }) => {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    if (task.trim() !== '') {
      addTask(task);
      setTask(''); // Clear input after adding
    }
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Enter the task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="button" onClick={handleAdd}>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default Create;
