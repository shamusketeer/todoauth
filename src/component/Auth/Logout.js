import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Clear the authentication state in local storage to log the user out
    localStorage.removeItem('authenticatedUser');
    // You can also redirect the user to the login page or any other desired behavior.
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
