import React, { useState } from 'react';
import UserForm, { UserFormType } from '../components/UserForm';

const UserFormPage: React.FC = () => {
  // Sample users list (in real applications, this data could come from an API)
  const [users, setUsers] = useState<UserFormType[]>([
    {
      name: 'John Doe',
      email: 'johndoe@example.com',
      addresses: [
        { city: 'New York', street: '123 Main St', zipCode: '10001' },
        { city: 'Los Angeles', street: '456 Sunset Blvd', zipCode: '90001' },
      ],
    },
    {
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      addresses: [{ city: 'Chicago', street: '789 Lakeshore Dr', zipCode: '60611' }],
    },
  ]);

  // To track whether we are creating or editing
  const [selectedUser, setSelectedUser] = useState<UserFormType | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  // Handle form submission
  const handleFormSubmit = (data: UserFormType) => {
    if (selectedUser) {
      // Editing existing user
      const updatedUsers = users.map((user) => (user.email === selectedUser.email ? data : user));
      setUsers(updatedUsers);
    } else {
      // Creating new user
      setUsers([...users, data]);
    }
    setIsFormVisible(false);
    setSelectedUser(null); // Clear after submission
  };

  // Function to start creating a new user
  const handleCreateNewUser = () => {
    setSelectedUser(null); // Reset selected user
    setIsFormVisible(true); // Show form
  };

  // Function to start editing a user
  const handleEditUser = (user: UserFormType) => {
    setSelectedUser(user); // Set selected user for editing
    setIsFormVisible(true); // Show form
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* Button to create a new user */}
      <button onClick={handleCreateNewUser}>Create New User</button>

      {/* Display a list of users with edit functionality */}
      <h2>Existing Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} - {user.email}
            <button onClick={() => handleEditUser(user)}>Edit</button>
          </li>
        ))}
      </ul>

      {/* Show form if visible */}
      {isFormVisible && (
        <div>
          <h2>{selectedUser ? 'Edit User' : 'Create New User'}</h2>
          <UserForm initialData={selectedUser || undefined} onSubmit={handleFormSubmit} />
        </div>
      )}
    </div>
  );
};

export default UserFormPage;