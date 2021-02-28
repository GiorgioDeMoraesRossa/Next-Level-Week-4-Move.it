import Head from "next/head";
import { GetServerSideProps } from "next";

import styles from "../styles/pages/Home.module.css";

import CompletedChallenges from "../components/CompletedChallenges";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";
import { Switch } from "../components/Switch";
import { useTheme } from "next-themes";
import { useState, useEffect, useContext } from "react";
import { Login as LoginComponent } from "../components/Login";
import { AuthContext } from "../contexts/AuthContext";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  usernameProp: string;
}

export default function Home({
  level,
  currentExperience,
  challengesCompleted,
  usernameProp,
}) {
  let { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState(false);
  const { username, isLoggedIn, Login } = useContext(AuthContext);

  if (!theme) {
    theme = "light";
  }

  //ve se tem username nos cookies, se tiver loga ele
  useEffect(() => {
    if (usernameProp != undefined && usernameProp != "") {
      Login(usernameProp);
    }
  }, [usernameProp]);

  useEffect(() => {
    if (theme === "dark") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);

  const handleThemeChange = () => {
    if (theme == "light") {
      setTheme("dark");
      setChecked(true);
    } else {
      setTheme("light");
      setChecked(false);
    }
  };

  return (
    <ChallengesProvider
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      {isLoggedIn ? (
        <div className={styles.container}>
          <Head>
            <title>Início | Move.it</title>
          </Head>

          <ExperienceBar />

          <Switch handleChange={handleThemeChange} checked={checked} />

          <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
      ) : (
        <>
          <Head>
            <title>Login | Move.it</title>
          </Head>
          <LoginComponent />
        </>
      )}
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    level,
    currentExperience,
    challengesCompleted,
    username,
  } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      usernameProp: String(username),
    },
  };
};
