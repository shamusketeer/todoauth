import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Signup from './component/Auth/SIgnUp';
import Login from './component/Auth/LogIn';
import Logout from './component/Auth/Logout';
import TaskList from './component/Todo/TaskList';
import TaskForm from './component/Todo/TaskForm';

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Load user data and tasks from local storage on component mount
  useEffect(() => {
    const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (authenticatedUser) {
      setUser(authenticatedUser);
      setTasks(storedTasks);
    }
  }, []);

  const handleLogin = (userData) => {
    // Implement user login logic and set user state
    setUser(userData);

    // Fetch tasks associated with the user
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  };

  const handleLogout = () => {
    // Clear the user state and tasks when logging out
    setUser(null);
    setTasks([]);

    // Remove the authenticated user from local storage
    localStorage.removeItem('authenticatedUser');
  };

  const addTask = (text) => {
    // Create a new task
    const newTask = {
      text,
      completed: false,
    };

    // Add the new task to the tasks array
    setTasks([...tasks, newTask]);

    // Save the updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
  };

  const editTask = (taskId, newText) => {
    // Update the text of a specific task
    const updatedTasks = tasks.map((task, index) =>
      index === taskId ? { ...task, text: newText } : task
    );

    // Update the state and save the updated tasks to local storage
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (taskId) => {
    // Remove a specific task from the tasks array
    const updatedTasks = tasks.filter((task, index) => index !== taskId);

    // Update the state and save the updated tasks to local storage
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const toggleComplete = (taskId) => {
    // Toggle the completion status of a specific task
    const updatedTasks = tasks.map((task, index) =>
      index === taskId ? { ...task, completed: !task.completed } : task
    );

    // Update the state and save the updated tasks to local storage
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route
            path="/login"
            render={() => (user ? <Redirect to="/tasks" /> : <Login onLogin={handleLogin} />)}
          />
          <Route
            path="/logout"
            render={() => (user ? <Logout onLogout={handleLogout} /> : <Redirect to="/login" />)}
          />
          <Route
            path="/tasks"
            render={() => (user ? (
              <div>
                <h1>Welcome, {user.username}!</h1>
                <TaskForm onSubmit={addTask} />
                <TaskList
                  tasks={tasks}
                  onDelete={deleteTask}
                  onEdit={editTask}
                  onToggleComplete={toggleComplete}
                />
              </div>
            ) : (
              <Redirect to="/login" />
            ))}
          />
          <Redirect from="/" to="/tasks" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
