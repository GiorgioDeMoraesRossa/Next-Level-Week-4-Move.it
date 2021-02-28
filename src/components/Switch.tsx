import styles from "../styles/components/Switch.module.css";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export function Switch({ handleChange, checked }) {
  const { Logout } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <p>Tema escuro</p>
      <label className={styles.switch}>
        <input type="checkbox" onChange={handleChange} checked={checked} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
      <button onClick={Logout}>Logout</button>
    </div>
  );
}
