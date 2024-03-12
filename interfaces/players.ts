type GameHistory = number[];

export interface IPlayer {
  id: string;
  name: string;
  score_history: GameHistory[];
  background_color: string;
}

