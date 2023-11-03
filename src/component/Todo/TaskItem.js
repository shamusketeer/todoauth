import React from 'react';

const TaskItem = ({ task, onDelete, onEdit, onToggleComplete }) => {
  // Function to update the task's text
  const handleEdit = (newText) => {
    // Retrieve the tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Update the task's text
    tasks[task.id].text = newText;
    // Save the updated tasks back to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Trigger the onEdit callback
    onEdit(newText);
  };

  // Function to toggle the completion status of the task
  const handleToggleComplete = () => {
    // Retrieve the tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Toggle the completed status of the task
    tasks[task.id].completed = !task.completed;
    // Save the updated tasks back to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Trigger the onToggleComplete callback
    onToggleComplete();
  };

  // Function to delete the task
  const handleDelete = () => {
    // Retrieve the tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Remove the task from the array
    tasks.splice(task.id, 1);
    // Save the updated tasks back to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Trigger the onDelete callback
    onDelete();
  };

  return (
    <li>
      <span>{task.text}</span>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => {
        const newText = prompt('Edit Task', task.text);
        if (newText) {
          handleEdit(newText);
        }
      }}>
        Edit
      </button>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleComplete}
      />
    </li>
  );
};

export default TaskItem;
