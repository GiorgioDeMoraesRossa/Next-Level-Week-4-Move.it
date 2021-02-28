import { createContext, ReactNode, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface AuthContextData {
  username: string;
  isLoggedIn: boolean;
  Login: (username: string) => void;
  Logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    Cookies.set("username", username);
  }, [username]);

  function Login(username: string) {
    //TODO: verifica se o username existe no github
    setIsLoggedIn(true);
    setUsername(username);
  }

  function Logout() {
    setIsLoggedIn(false);
    setUsername("");
    Cookies.remove("username");
  }

  return (
    <AuthContext.Provider
      value={{ username: username, isLoggedIn: isLoggedIn, Logout, Login }}
    >
      {children}
    </AuthContext.Provider>
  );
}
