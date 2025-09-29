import type { NextApiRequest, NextApiResponse } from "next";

// Different type of request (using next as proxy) since this needs to be real time request
// (meaning getserverside won't work for this scenario)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { word, lang } = req.query;

  if (!word || !lang) {
    return res.status(400).json({ error: "Missing word or lang parameter" });
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/suggestions?word=${word}&lang=${lang}`
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
}
