import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    
    // Retrieve the existing tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Create a new task object
    const newTask = {
      text,
      completed: false, // Assuming the task is initially not completed
    };

    // Add the new task to the tasks array
    tasks.push(newTask);

    // Save the updated tasks back to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Trigger the onSubmit callback to update the task list
    onSubmit(newTask);

    // Clear the input field
    setText('');
  };

  return (
    <form onSubmit={handleTaskSubmit}>
      <input
        type="text"
        placeholder="New task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
