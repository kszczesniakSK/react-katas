import clsx from "clsx";
import { useCallback, useMemo } from "react";

type UserListProps = {
    users: string[];
    onUserSelect: (user: string) => void;
    selectedUser: string | null;
  };

const UserList: React.FC<UserListProps> = ({ users, onUserSelect, selectedUser }) => {
    // Memoize the filtered list so it's recalculated only when `users` changes
    const filteredUsers = useMemo(() => {
      return users.filter((user) => user.includes('John'));
    }, [users]);
  
    // Memoize the click handler to avoid re-creation on every render
    const handleUserClick = useCallback(
      (user: string) => {
        onUserSelect(user);
      },
      [onUserSelect]
    );
  
    return (
      <ul>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <li
              key={`${user}-${index}`} // Use a unique key
              onClick={() => handleUserClick(user)}
              className={clsx({
                'selected-user': selectedUser === user,
              })}
            >
              {user}
            </li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
    );
  };

  export default UserList