import React, { useState } from 'react';
import '../styles/main.css';

function NewChatDialog({ onSave, onCancel, isEditMode, chat }) {
  const [firstName, setFirstName] = useState(chat ? chat.firstName : '');
  const [lastName, setLastName] = useState(chat ? chat.lastName : '');

  const handleSave = () => {
    onSave({
      id: chat ? chat.id : null,
      firstName,
      lastName,
    });
  };

  return (
    <div className="new-chat-dialog">
      <div className="dialog-content">
        <h2>{isEditMode ? 'Edit Chat' : 'New Chat'}</h2>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <div className="dialog-actions">
          <button onClick={handleSave}>{isEditMode ? 'Save' : 'Create'}</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default NewChatDialog;
