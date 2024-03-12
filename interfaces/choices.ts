export const enum ChoiceEnum {
  Rock = "rock",
  Paper = "paper",
  Scissors = "scissors",
  Lizard = "lizard",
  Spock = "spock",
}

export interface IChoice {
  id: number;
  name: ChoiceEnum;
}