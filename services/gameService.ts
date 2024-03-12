import { IChoice } from "../interfaces/choices";
import { IGameResult } from "../interfaces/game";

export class GameService {
  public static async getChoices(abortController?: AbortController): Promise<IChoice[] | null> {
    try {
      const res = await fetch("https://codechallenge.boohma.com/choices", { signal: abortController?.signal });
      if (res.ok) {
        return await res.json();
      }

      return null;
    } catch (e) {
      // TODO handle error
      console.log(e);
      return null;
    }
  }

  public static async playRound(choice_id: number): Promise<IGameResult | null> {
    try {
      const res = await fetch("https://codechallenge.boohma.com/play", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ player: choice_id }),
      });
      if (res.ok) {
        return await res.json();
      }

      return null;
    } catch (e) {
      // TODO handle error
      console.log(e);
      return null;
    }
  }
}