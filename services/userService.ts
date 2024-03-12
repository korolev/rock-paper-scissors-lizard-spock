import { IPlayer } from "../interfaces/players";

const RANDOM_USER_URL = 'http://localhost:3000/api/user/random';

const sleep = (ms: number) => {
  return new Promise<void>((res) => {
    setTimeout(() => res(), ms);
  });
};

const saveToLS = async (data: string) => {
  await sleep(250);
  localStorage.setItem("user-data", data);
}

const readFromLS = async () => {
  await sleep(250);
  return localStorage.getItem("user-data") || "";
}



export class UserService {
  public static async getPlayers(): Promise<IPlayer[] | null> {
    try {
      const users = await readFromLS();
      if (users) {
        return JSON.parse(users);
      }

      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  public static async addRandomPlayer(): Promise<IPlayer | null> {
    try {
      const res = await fetch(RANDOM_USER_URL);
      if (!res.ok) {
        return null;
      }

      const { user: newPlayer }: { user: IPlayer | null } = await res.json();

      const users = await readFromLS();
      const parsedUsers = users ? JSON.parse(users) : [];
      await saveToLS(JSON.stringify([...parsedUsers, newPlayer]));


      return newPlayer;
    } catch (e) {
      console.log(e);
      return null;
    }

  }

  public static async updateCurrentGameHistory(userId: string, scoreRecord: number): Promise<IPlayer | null> {
    try {
      const users = await readFromLS();
      if (users) {
        const parsedUsers = JSON.parse(users);
        const userIndex = parsedUsers.findIndex((user: IPlayer) => user.id === userId);
        const currentUser = userIndex > -1 ? parsedUsers[userIndex] : null;

        if (currentUser) {
          // hacky way to avoid checking if length is 0
          const historyLen = currentUser.score_history.length || 1;
          const lastGame = currentUser.score_history[historyLen - 1] || [];
          lastGame.push(scoreRecord);
          parsedUsers[userIndex].score_history[historyLen - 1] = lastGame;
          await saveToLS(JSON.stringify(parsedUsers));

          return currentUser;
        }
      }

      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  public static async pushNewGameToHistory(userId: string): Promise<IPlayer | null> {
    try {
      const users = await readFromLS();
      if (users) {
        const parsedUsers = JSON.parse(users);
        const userIndex = parsedUsers.findIndex((user: IPlayer) => user.id === userId);
        const currentUser = userIndex > -1 ? parsedUsers[userIndex] : null;

        if (currentUser) {
          parsedUsers[userIndex].score_history.push([]);
          await saveToLS(JSON.stringify(parsedUsers));

          return currentUser;
        }
      }

      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}