import { createContext, ReactNode, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { User } from "../types";
import { useRouter } from "next/router";

interface AuthContextData {
  user: User;
  isLoggedIn: boolean;
  Login: (code: string) => Promise<boolean>;
  Logout: () => void;
  RenewLogin: (user: User) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({
    username: "",
    name: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  /*useEffect(() => {
    Cookies.set("username", username);
  }, [username]);*/

  async function Login(code: string) {
    // pega acesss token e infos e salva no mongoDb
    const user = await axios
      .post("/api/accessUserData", {
        code,
      })
      .then((response) =>
        response.status != 201 ? { name: "", username: "" } : response.data
      )
      .catch((error) => console.log(error));

    if (user) {
      setUser({ name: user.name, username: user.username });
      setIsLoggedIn(true);
      router.push("/");

      return true;
    }
    return false; // if login fails
  }

  async function RenewLogin(user: User) {
    /* Renew acesss token? */
    /* Renovar informações a partir do mongoDb (caso tenha logado em outra máquina) */
    setIsLoggedIn(true);
    setUser(user);
  }

  /* base
  function Login(username: string) {    
    setIsLoggedIn(true);
    setUsername(username);
  }*/

  function Logout() {
    setIsLoggedIn(false);
    setUser({ username: "", name: "" });
    Cookies.remove("user");
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: isLoggedIn, Logout, Login, RenewLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}
