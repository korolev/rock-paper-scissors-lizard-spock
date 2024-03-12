import type { NextApiRequest, NextApiResponse } from 'next'
import { IPlayer } from '../../../../interfaces/players';
import { generateRandomHSLColor } from '../../../../utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const RANDOM_NAME_URL = 'https://muna.ironarachne.com/human/?count=2';

  try {
    const usersData = await fetch(RANDOM_NAME_URL);
    const { names } = await usersData.json();

    const newPlayer: IPlayer = {
      id: crypto.randomUUID(),
      name: `${names[0]} ${names[1]}`,
      score_history: [],
      background_color: generateRandomHSLColor()
    }

    res.status(200).json({ user: newPlayer })
  } catch (e) {
    res.status(500).json({ error: e })
  }
}