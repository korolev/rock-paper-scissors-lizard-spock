export const enum GameResultEnum {
  Win = "win",
  Lose = "lose",
  Tie = "tie",
}

export interface IGameResult {
  results: GameResultEnum;
  player: number;
  computer: number;
}