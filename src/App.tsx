import React, { useState, ChangeEvent, FocusEvent } from 'react';
import clsx from 'clsx';
import './App.css';

const App: React.FC = () => {
  // State to manage UI interactions and conditional rendering
  const [showList, setShowList] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Example list of users
  const users: string[] = ['John Doe', 'Jane Smith', 'Bob Johnson'];

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle blur event
  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    alert('Input lost focus');
  };

  // Handle user selection
  const handleUserClick = (user: string) => {
    setSelectedUser(user);
  };

  // Multiple returns based on conditions
  if (!showList) {
    return (
      <div>
        <h1>Conditional UI Example</h1>
        <button onClick={() => setShowList(true)}>Show User List</button>
      </div>
    );
  }

  return (
    <div>
      <h1>User List</h1>

      {/* Ternary operator example */}
      {users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li
              key={index}
              onClick={() => handleUserClick(user)}
              className={clsx({
                'selected-user': selectedUser === user,
              })}
            >
              {user}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users available.</p>
      )}

      {/* && notation example */}
      {selectedUser && <p>Selected User: {selectedUser}</p>}

      <button onClick={() => setShowList(false)}>Hide List</button>

      {/* Handling user interaction: input change and blur */}
      <div>
        <input
          type="text"
          placeholder="Enter something"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={clsx({
            'input-active': inputValue.length > 0,
          })}
        />
      </div>
    </div>
  );
};

export default App;