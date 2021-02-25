import styles from "../styles/components/Profile.module.css";

export default function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img
        src="https://avatars.githubusercontent.com/u/42917799?s=460&u=4944f3d035394db99978c156da627595d5cbc062&v=4"
        alt="Giorgio Rossa"
      />
      <div>
        <strong>Giorgio Rossa</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level 1
        </p>
      </div>
    </div>
  );
}
