import clsx from "clsx";
import { useUserContext } from "../context/useUserContext";

const UserList: React.FC = () => {
  const { selectedUser, setSelectedUser } = useUserContext();
  const { username, setUsername, logoutUser } = useContext(UserContext);
  const users = ["John Doe", "Jane Smith", "Bob Johnson"];

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user, index) => (
          <li
            key={index}
            onClick={() => setSelectedUser(user)}
            className={clsx({
              "selected-user": selectedUser === user,
            })}
          >
            {user}
          </li>
        ))}
      </ul>

      {/* Display selected user from context */}
      {selectedUser && <p>Selected User: {selectedUser}</p>}
    </div>
  );
};

export default UserList;
