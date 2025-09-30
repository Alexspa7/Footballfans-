export default async function handler(req, res) {
  const apiKey = process.env.FOOTBALL_API_KEY; // το API key από τα Vercel env
  const url = "https://api.football-data.org/v4/matches";

  try {
    const response = await fetch(url, {
      headers: { "X-Auth-Token": apiKey }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "API error" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
}
