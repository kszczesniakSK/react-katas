import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

// User Context Setup
type UserContextType = {
  userToken: string | null;
  setUserToken?: (token: string | null) => void;
  logoutUser?: () => void;
};

const USER_TOKEN_STORAGE_KEY = "user_token";
const defaultContextValue: UserContextType = { userToken: null };
export const UserContext = createContext<UserContextType>(defaultContextValue);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [userToken, setUserToken] = useState<string | null>(() =>
    localStorage.getItem(USER_TOKEN_STORAGE_KEY)
  );

  const logoutUser = useCallback(() => {
    setUserToken(null);
  }, []);

  useEffect(() => {
    if (userToken) {
      localStorage.setItem(USER_TOKEN_STORAGE_KEY, userToken);
    } else {
      localStorage.removeItem(USER_TOKEN_STORAGE_KEY);
    }
  }, [userToken]);

  const value = useMemo(
    () => ({ logoutUser, setUserToken, userToken }),
    [logoutUser, setUserToken, userToken]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
