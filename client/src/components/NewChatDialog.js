import React, { useState } from 'react';

function NewChatDialog({ setIsDialogOpen }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const createChat = async () => {
    if (firstName && lastName) {
      await fetch('/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName })
      });
      setIsDialogOpen(false);
      window.location.reload();
    }
  };

  return (
    <div className="dialog">
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <button onClick={createChat}>Create Chat</button>
      <button onClick={() => setIsDialogOpen(false)}>Cancel</button>
    </div>
  );
}

export default NewChatDialog;
