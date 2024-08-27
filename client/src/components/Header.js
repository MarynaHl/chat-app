import React from 'react';

function Header({ toggleSocket }) {
  return (
    <header>
      <h1>Chat Application</h1>
      <button onClick={toggleSocket}>Toggle Auto Messages</button>
    </header>
  );
}

export default Header;
