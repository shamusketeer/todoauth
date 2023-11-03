import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Validate user input
    if (!username || !password) {
      setError('Please fill out all fields.');
      return;
    }

    // Check if the user exists in local storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = existingUsers.find((u) => u.username === username && u.password === password);

    if (!user) {
      setError('Invalid username or password. Please try again.');
      return;
    }

    // Set the user as authenticated in the state (You might use a state management library in a real application)
    // For a simplified example, we'll set a variable to indicate authentication.
    localStorage.setItem('authenticatedUser', JSON.stringify(user));
    
    // Clear the form and error message
    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
