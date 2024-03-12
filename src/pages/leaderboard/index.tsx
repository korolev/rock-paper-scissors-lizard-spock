import { use, useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../../context/app.context";
import { Divider } from "../../../components/Divider";
import { GameBoardFragment } from "../../../components/GameBoardFragment";
import { UserService } from "../../../services/userService";

const tenColumns = Array.from(Array(10).keys());

export default function Leaderboard() {
  const [isLoading, setIsLoading] = useState(false);
  const { players, setPlayers } = useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);
    UserService.getPlayers()
      .then((data) => {
        setPlayers?.(data ?? []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const last10Games = useMemo(() => {
    return players.map((player) => {
      const gamesHistory = player.score_history.slice(-10).reverse();
      return {
        player: player,
        games: gamesHistory.map((game) => ({
          rounds: game.length,
          score: game.reduce((acc, score) => acc + score, 0),
        })),
      };
    });
  }, [players]);

  return (
    <>
      <Divider />
      <h1>Leaderboard (10 games)</h1>
      <GameBoardFragment isLoading={isLoading} isStyled={false}>
        <table>
          <thead>
            <tr>
              <th rowSpan={2}>Player</th>
              <th colSpan={10}>Score (rounds / score)</th>
            </tr>
            <tr>
              {tenColumns.map((i) => (
                <th key={i}>{i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {last10Games.map(({player, games}) => (
              <tr key={player.id}>
                <td>{player.name}</td>
                {tenColumns.map((idx) => (
								  <th key={idx}>{
                    games[idx] ? `${games[idx].rounds} / ${games[idx].score}` : "-/-"
                  }</th>
							  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </GameBoardFragment>
    </>
  );
}
