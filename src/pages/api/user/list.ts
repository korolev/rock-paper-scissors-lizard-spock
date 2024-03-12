import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessionData = req.body

  // This is a placeholder for the actual user list
  res.status(200).json({ data: [] })
}