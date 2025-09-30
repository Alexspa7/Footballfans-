// api/matches.js

export default async function handler(req, res) {
  try {
    // Παίρνουμε την σημερινή ημερομηνία σε format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];

    // Καλούμε το API-Football για Champions League (CL)
    const apiRes = await fetch(
      `https://api.football-data.org/v4/matches?dateFrom=${today}&dateTo=${today}&competitions=CL`,
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_API_KEY, // Το API key σου από τα Environment Variables
        },
      }
    );

    if (!apiRes.ok) {
      throw new Error(`API request failed: ${apiRes.status}`);
    }

    const data = await apiRes.json();

    // Επιστρέφουμε μόνο τους αγώνες
    res.status(200).json(data.matches || []);
  } catch (err) {
    res.status(500).json({ error: "API error", details: err.message });
  }
}
