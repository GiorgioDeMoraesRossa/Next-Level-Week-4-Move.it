import styles from "../styles/components/Switch.module.css";

export function Switch({ handleChange, checked }) {
  return (
    <div className={styles.container}>
      <p>Tema escuro</p>
      <label className={styles.switch}>
        <input type="checkbox" onChange={handleChange} checked={checked} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
}
