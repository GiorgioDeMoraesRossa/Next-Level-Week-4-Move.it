import styles from "../styles/components/Profile.module.css";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Profile() {
  const { level } = useContext(ChallengesContext);
  const { username } = useContext(AuthContext);
  return (
    <div className={styles.profileContainer}>
      <img src={`http://github.com/${username}.png`} alt={username} />
      <div>
        <strong>{username.split(/(?=[A-Z])/).map((word) => `${word} `)}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
