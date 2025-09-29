import { useEffect, useState } from "react";

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMatches() {
      try {
        const res = await fetch("/api/index"); // Καλεί το API σου
        const data = await res.json();
        setMatches(data.results);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMatches();
  }, []);

  if (loading) return <p>Φόρτωση αγώνων...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>⚽ Αγώνες Σήμερα</h1>
      {matches.map((competition, idx) => (
        <div key={idx} style={{ marginBottom: "30px" }}>
          <h2>{competition.competition}</h2>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Ημερομηνία</th>
                <th>Γηπεδούχος</th>
                <th>Φιλοξενούμενος</th>
                <th>Σκορ</th>
              </tr>
            </thead>
            <tbody>
              {competition.matches.map((m, i) => (
                <tr key={i}>
                  <td>{new Date(m.utcDate).toLocaleString("el-GR")}</td>
                  <td>{m.homeTeam?.name}</td>
                  <td>{m.awayTeam?.name}</td>
                  <td>
                    {m.score.fullTime.home} - {m.score.fullTime.away}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
