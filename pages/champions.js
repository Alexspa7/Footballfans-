import { useEffect, useState } from "react";

export default function ChampionsLeague() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("/matches.json") // εδώ μπορείς να βάλεις το API link που έχεις
      .then((res) => res.json())
      .then((data) => {
        setMatches(data.results[0].matches || []);
      })
      .catch((err) => console.error("Error loading matches:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Champions League - Αγώνες</h1>
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
          {matches.map((match, i) => (
            <tr key={i}>
              <td>{new Date(match.utcDate).toLocaleDateString("el-GR")}</td>
              <td>{match.homeTeam.name}</td>
              <td>{match.awayTeam.name}</td>
              <td>
                {match.score.fullTime.home} - {match.score.fullTime.away}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
