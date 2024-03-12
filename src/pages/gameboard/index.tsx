import { useRouter } from "next/router";
import { AppContext } from "../../../context/app.context";
import { use, useContext, useEffect, useState } from "react";
import { Divider } from "../../../components/Divider";
import { IChoice } from "../../../interfaces/choices";
import { GameService } from "../../../services/gameService";
import { ChoiceButton } from "../../../components/ChoiceButton";
import { GameBoardFragment } from "../../../components/GameBoardFragment";
import { GameResultEnum, IGameResult } from "../../../interfaces/game";
import { Button } from "../../../components/Button";
import { UserService } from "../../../services/userService";

const resultToScore = {
  [GameResultEnum.Win]: 1,
  [GameResultEnum.Lose]: -1,
  [GameResultEnum.Tie]: 0,
};

const gameResultToMessage = {
  [GameResultEnum.Win]: "You won!",
  [GameResultEnum.Lose]: "You lose!",
  [GameResultEnum.Tie]: "It's a tie!",
}

const gameResultToTextColor = {
  [GameResultEnum.Win]: "yellowgreen",
  [GameResultEnum.Lose]: "tomato",
  [GameResultEnum.Tie]: "lightblue",
}

export default function Game() {
  const router = useRouter();
  const { currentPlayerId, players, setPlayers } = useContext(AppContext);
  const [choices, setChoices] = useState<IChoice[]>([]);
  const [gameResult, setGameResult] = useState<IGameResult | null>(null);
  const [playerChoice, setPlayerChoice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // client side redirect :( do i need spinner?
    if (!currentPlayerId) {
      router.push("/");
    }
  }, [currentPlayerId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setGameResult(null);
      setPlayerChoice(null);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [gameResult]);

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);

    GameService.getChoices(abortController).then((data) => {
      setChoices(data ?? []);			
    }).finally(() => {
      setIsLoading(false);
    });

    return () => {
      abortController.abort();
    };
  }, []);

  const handleChoice = async (choiceId: number) => {
    setPlayerChoice(choiceId);
    setIsLoading(true);

    const res = await GameService.playRound(choiceId);
    setGameResult(res);

    // update score
    if (res?.results && currentPlayerId) {
      const playerUpd = await UserService.updateCurrentGameHistory(
        currentPlayerId,
        resultToScore[res.results]
      );

      if (playerUpd) {
        // next time let's use solution with store ...
        setPlayers?.(
          players.map((player) =>
            player.id === playerUpd.id ? playerUpd : player
          )
        );
      }
    }

    setIsLoading(false);
  };

  const handleAddNewGame = async () => {
    setIsLoading(true);

    if (currentPlayerId) {
      const playerUpd = await UserService.pushNewGameToHistory(currentPlayerId);

      if (playerUpd) {
        setPlayers?.(
          players.map((player) =>
            player.id === playerUpd.id ? playerUpd : player
          )
        );
      }
    }

    setIsLoading(false);
  };

  return (
    <div>
      {isLoading ? <p>Loading...</p> : null}
      <Divider />
      <h1>Make your choice</h1>
      <GameBoardFragment isLoading={isLoading}>
        {choices.map((choice) => {
          return (
            <ChoiceButton
              disabled={isLoading}
              key={choice.id}
              choice={choice}
              isActive={playerChoice === choice.id}
              onClick={() => handleChoice(choice.id)}
            />
          );
        })}
      </GameBoardFragment>

      <h1>Computer&apos;s choice</h1>
      <GameBoardFragment isLoading={isLoading}>
        {choices.map((choice) => {
          return (
            <ChoiceButton
              isActive={gameResult?.computer === choice.id}
              choice={gameResult?.computer === choice.id ? choice : undefined}
              key={choice.id}
            />
          );
        })}
      </GameBoardFragment>

      <Divider />

      {gameResult ? (				
        <GameBoardFragment isLoading={isLoading}>
          <h1>Game result</h1>
          <p
            style={{
              color: gameResultToTextColor[gameResult?.results],
              fontSize: "3rem",
              textTransform: "uppercase",
            }}
          >
            {gameResultToMessage[gameResult?.results]}
          </p>
        </GameBoardFragment>
      ) : (
        <GameBoardFragment isLoading={isLoading}>
          <Button disabled={isLoading} onClick={handleAddNewGame}>
						Start new game
          </Button>
          <Button onClick={() => router.push("/leaderboard")}>
						Watch leaderboard
          </Button>
        </GameBoardFragment>
      )}
    </div>
  );
}
