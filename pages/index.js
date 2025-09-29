import { useEffect, useState } from "react";

export default function Home() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("/matches.json")
      .then((res) => res.json())
      .then((data) => setMatches(data));
  }, []);

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>Champions League - Αγωνιστική</h1>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Γηπεδούχος</th>
            <th>Φιλοξενούμενος</th>
            <th>Άσσος</th>
            <th>Χ</th>
            <th>Διπλό</th>
            <th>Πρόβλεψη</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td>{match.home}</td>
              <td>{match.away}</td>
              <td>{match.home_odds}</td>
              <td>{match.draw_odds}</td>
              <td>{match.away_odds}</td>
              <td><b>{match.prediction}</b></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
