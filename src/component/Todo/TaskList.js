import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ onDelete, onEdit, onToggleComplete }) => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          onDelete={() => onDelete(index)}
          onEdit={(newText) => onEdit(index, newText)}
          onToggleComplete={() => onToggleComplete(index)}
        />
      ))}
    </ul>
  );
};

export default TaskList;
