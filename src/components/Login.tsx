import styles from "../styles/components/Login.module.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;

export function Login() {
  const { Login, isLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // Github API retornou o código de parâmetro
    if (hasCode) {
      const code = url.split("?code=")[1];

      // chama função de login com o codigo do github
      setIsLoading(true);
      Login(code).then((loginResult) => {
        setLoginError(!loginResult);
        setIsLoading(false);
      });
    }

    // não logou entao não faz nada
  }, []);

  // se deu erro, tira o erro depois de um tmepo
  if (loginError) {
    setTimeout(() => {
      setLoginError(false);
    }, 2000);
  }

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
        {isLoading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : loginError ? (
          <div>
            <p>Erro no login !</p>
          </div>
        ) : (
          <div className={styles.inputDiv}>
            {/* input p username
          <input
            placeholder="Digite seu username"
            onChange={(e) => setUsername(e.target.value)}
          /> 
           {/*`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`*/}

            <a
              className="login-link"
              href="/api/githubRedirect"
              onClick={() => {}}
            >
              <img src="/icons/github.svg" alt="github icon" />
              Login
            </a>
            {/* botao da seta
          <button
            disabled={username.length === 0}
            onClick={() => Login(username)}
          >
            <img src="/icons/login.svg" />
          </button>
          */}
          </div>
        )}
      </div>
    </div>
  );
}
