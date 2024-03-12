import { FC } from "react";
import { IPlayer } from "../../interfaces/players";
import { UserAvatar } from "../UserAvatar";
import styles from "./index.module.css";
import { generateRandomHSLColor } from "../../utils";

interface PlayerProps {
  player: IPlayer;
  onClick: () => void;
}

export const Player: FC<PlayerProps> = ({ player, onClick }) => {
  return (
    <div className={styles.player} role="button" onClick={onClick}>
      <UserAvatar name={player.name} backgroundColor={player.background_color}/>
      <p className={styles.playerName}>{player.name}</p>
    </div>
  );
};
