export default async function handler(req, res) {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "API key not set in environment variables" });
  }

  try {
    // Competitions που θέλουμε
    const competitions = ["CL", "EL", "ECL", "PL", "SA", "PD", "BL1", "FL1"];

    // Κάνουμε fetch για καθεμία
    const results = await Promise.all(
      competitions.map(async (comp) => {
        const response = await fetch(
          `https://api.football-data.org/v4/competitions/${comp}/matches`,
          {
            headers: {
              "X-Auth-Token": API_KEY,
            },
          }
        );

        const data = await response.json();

        return {
          competition: data.competition?.name || comp,
          matches: data.matches || [],
        };
      })
    );

    res.status(200).json({ results });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
}
