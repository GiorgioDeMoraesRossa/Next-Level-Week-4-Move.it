import styles from "../styles/components/Login.module.css";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function Login() {
  const [username, setUsername] = useState("");
  const { Login } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src="/logo-full-white.svg" alt="logo move.it" />
        <h1>Bem-vindo</h1>
        <label>
          <img src="/icons/github.svg" alt="github icon" />
          <p>
            Faça login com seu Github
            <br /> para começar
          </p>
        </label>
        <div className={styles.inputDiv}>
          <input
            placeholder="Digite seu username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            disabled={username.length === 0}
            onClick={() => Login(username)}
          >
            <img src="/icons/login.svg" />
          </button>
        </div>
      </div>
    </div>
  );
}
