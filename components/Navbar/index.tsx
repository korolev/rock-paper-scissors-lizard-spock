import { FC, ReactNode, useContext } from "react";
import styles from "./index.module.css";
import { AppContext } from "../../context/app.context";
import { UserAvatar } from "../UserAvatar";
import { useRouter } from "next/router";
import Link from "next/link";

// TODO all route path move to constants DRY

export const Navbar: FC<{ children?: ReactNode }> = ({ children }) => {
  const { currentPlayerId, players } = useContext(AppContext);
  const router = useRouter();
  const player = players.find((player) => player.id === currentPlayerId);
  const lastGame = player?.score_history.at(-1) ?? [];
  const lastScore = lastGame.reduce((acc, score) => acc + score, 0)

  return (
    <nav className={styles.navbar}>
      {children}
      {router.pathname !== "/" ? <Link href="/">Home</Link> : null}
      {router.pathname !== "/leaderboard" ? <Link href="/leaderboard">Leaderboard</Link> : null}
      {player && router.pathname !== "/gameboard" ? <Link href="/gameboard">Play Game</Link> : null}			
      {player ? (
        <div className={styles.navbarUser}>					
          <p className={styles.navbarUserName}>{player?.name}</p>
          <p>(score: {lastScore})</p>
          <UserAvatar
            name={player.name}
            backgroundColor={player.background_color}
          />
        </div>
      ) : null}
    </nav>
  );
};
