import {
    createContext,
    type PropsWithChildren,
    useCallback,
    useMemo,
    useState
  } from "react";
  
  // Define the structure for the UserContext
  type UserContextType = {
    username: string | null;
    setUsername?: (name: string | null) => void;
    logoutUser?: () => void;
  };
  
  // Default context value
  const defaultContextValue: UserContextType = {
    username: null,
  };
  
  // Create the UserContext with default values
  export const UserContext = createContext<UserContextType>(defaultContextValue);
  
  // Create the UserProvider component to provide the context to child components
  export const UserProvider = ({ children }: PropsWithChildren) => {
    // useState to manage username
    const [username, setUsername] = useState<string | null>(null);
  
    // A function to simulate user logout
    const logoutUser = useCallback(() => {
      console.log("User logged out");
      setUsername(null); // Reset the username
    }, [setUsername]);
  
    // Memoize the context value
    const value = useMemo(
      () => ({ username, setUsername, logoutUser }),
      [username, setUsername, logoutUser]
    );
  
    // Provide the context value to child components
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
  };