import React from 'react';
import '../styles/main.css';

function Header({ toggleSocket }) {
  return (
    <header className="app-header">
      <div className="profile">
        <img src="/profile-pic.png" alt="Profile" />
        <span className="user-name">User Name</span>
      </div>
      <button className="login-btn" onClick={toggleSocket}>Toggle Socket</button>
    </header>
  );
}

export default Header;
