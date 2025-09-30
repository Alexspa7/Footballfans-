export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.football-data.org/v4/competitions/CL/matches?dateFrom=2025-09-30&dateTo=2025-09-30",
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error("API error: " + response.status);
    }

    const data = await response.json();

    res.status(200).json(data.matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
