import React, { useState, useEffect } from 'react';

const NewChatDialog = ({ onSave, onCancel, isEditMode, chat }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (isEditMode && chat) {
      const [first, last] = chat.name.split(' ');
      setFirstName(first);
      setLastName(last);
    }
  }, [isEditMode, chat]);

  const handleSave = () => {
    onSave({ id: chat?.id, firstName, lastName });
  };

  return (
    <div className="new-chat-dialog">
      <h2>{isEditMode ? 'Edit Chat' : 'New Chat'}</h2>
      <div>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSave}>{isEditMode ? 'Update' : 'Save'}</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default NewChatDialog;
