import { FC, useContext, useState } from "react";
import { Player } from "../Player";
import { AppContext } from "../../context/app.context";
import styles from "./index.module.css";
import { Divider } from "../Divider";
import { UserService } from "../../services/userService";
import { Button } from "../Button";
import { useRouter } from "next/router";

export const PlayerList: FC<{}> = () => {
  const { players, setPlayers, setCurrentPlayerId } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddNewPlayer = async () => {
    setIsLoading(true);
    const newPlayer = await UserService.addRandomPlayer();
    if (newPlayer) {
      setPlayers?.([...players, newPlayer]);
      setIsLoading(false);
    }
  };

  const handleSelectPlayer = (id: string) => {
    setCurrentPlayerId?.(id);
    router.push("/gameboard");
  };

  return (
    <div>
      <h2>Select from existing or add new Player</h2>
      <p>We are not going to ask for your personal details and will create an anonymous random player for you.</p>
      <Button
        onClick={handleAddNewPlayer}
        appearance="primary"
        disabled={isLoading}
      >
				Add new player
      </Button>
      {players.length > 0 ? (
        <>
          <Divider />
          <div className={styles.list}>
            {players.map((player) => (
              <Player
                key={player.id}
                player={player}
                onClick={() => handleSelectPlayer(player.id)}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};
