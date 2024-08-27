import React from 'react';
import '../styles/main.css';

function Header() {
  return (
    <header className="app-header">
      <div className="profile">
        <img src="/profile-pic.png" alt="Profile" className="profile-pic" />
        <span className="user-name">User Name</span>
      </div>
      <button className="toggle-socket-btn">Toggle Socket</button>
    </header>
  );
}

export default Header;
