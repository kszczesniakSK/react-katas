import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  useCallback,
  ChangeEvent,
  FocusEvent,
} from "react";
import { useToggle, useLocalStorage } from "react-use"; // React-Use hooks
import clsx from "clsx";
import UserList from "../components/UserList";
import { useUserContext } from "../context/useUserContext";
import { useNavigate } from "react-router-dom";
import { fetchPosts } from "./ReactQueryPage";
import { useQuery } from "@tanstack/react-query";
import { Post } from "../types";

// Reducer Example
type StateType = { count: number };
type ActionType = { type: "increment" | "decrement" };

const countReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const HomePage: React.FC = () => {
  const { userToken, setUserToken, logoutUser } = useUserContext(); // Using context

  // useState with optimized initialValue
  const [showList, setShowList] = useState<boolean>(() => false);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedUser] = useState<string | null>(null);
  const [complexValue, setComplexValue] = useState<number>(() => {
    // Simulating a complex calculation
    return 100 * 2;
  });

  // useReducer hook
  const [state, dispatch] = useReducer(countReducer, { count: 0 });

  // React-use hooks
  const [isToggled, toggle] = useToggle(false);
  const [localStorageValue, setLocalStorageValue] = useLocalStorage(
    "localStorageKey",
    "Initial Value"
  );

  const navigate = useNavigate();
  // useRef hook
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Example list of users
  const users: string[] = ["John Doe", "Jane Smith", "Bob Johnson"];

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle blur event
  const handleInputBlur = () => {
    alert("Input lost focus");
  };

  // Handle user selection - memoized with useCallback
  const handleUserSelect = useCallback(
    (user: string) => {
      // setSelectedUser(user);
      navigate(`/users/${user}`);
    },
    [navigate]
  );

  // useEffect with empty dependency array
  useEffect(() => {
    console.log("Component mounted");

    const intervalId = setInterval(() => {
      console.log("Interval running");
    }, 1000);

    // Clean up interval on unmount
    return () => {
      clearInterval(intervalId);
      console.log("Component unmounted, interval cleared");
    };
  }, []); // Empty dependency array to run once

  console.log({ selectedUser });
  // useEffect with filled dependency array
  useEffect(() => {
    if (selectedUser) {
      console.log(`User selected: ${selectedUser}`);
    }
  }, [selectedUser]); // Dependency on selectedUser

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

      {/* Render the new UserList component */}
      <UserList
        users={users}
        onUserSelect={handleUserSelect}
        selectedUser={selectedUser}
      />

      {/* && notation example */}
      {selectedUser && <p>Selected User: {selectedUser}</p>}

      <button onClick={() => setShowList(false)}>Hide List</button>

      {/* Handling user interaction: input change and blur */}
      <div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter something"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={clsx({
            "input-active": inputValue.length > 0,
          })}
        />
      </div>

      {/* Complex state value and updating based on current value */}
      <p>Complex calculated value: {complexValue}</p>
      <button onClick={() => setComplexValue((prev) => prev + 1)}>
        Increase complex value
      </button>

      {/* Reducer state */}
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>

      {/* React-use hooks */}
      <p>Toggle State: {isToggled.toString()}</p>
      <button onClick={() => toggle()}>Toggle</button>

      <p>Local Storage Value: {localStorageValue}</p>
      <button onClick={() => setLocalStorageValue("New Value")}>
        Set Local Storage Value
      </button>

      {/* Context */}
      <p>User Token: {userToken ? userToken : "No token"}</p>
      <button onClick={() => setUserToken && setUserToken("sample_token")}>
        Set Token
      </button>
      <button onClick={() => logoutUser && logoutUser()}>Logout</button>
    </div>
  );
};

export default HomePage;
