export default async function handler(req, res) {
  const apiKey = process.env.FOOTBALL_API_KEY; // το API key από το Vercel
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const url = `https://api.football-data.org/v4/competitions/CL/matches?dateFrom=${today}&dateTo=${today}`;

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
