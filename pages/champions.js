export default function Champions() {
  const [matches, setMatches] = React.useState([]);

  React.useEffect(() => {
    fetch("/matches.json")   // <-- Εδώ δείχνει στο αρχείο σου
      .then((res) => res.json())
      .then((data) => setMatches(data))
      .catch((err) => console.error("Σφάλμα φόρτωσης:", err));
  }, []);

  return (
    <div>
      <h1>Champions League Αγώνες</h1>
      <ul>
        {matches.map((match) => (
          <li key={match.id}>
            {match.home} vs {match.away} <br />
            Odds: {match.home_odds} - {match.draw_odds} - {match.away_odds} <br />
            Πρόβλεψη: {match.prediction}
          </li>
        ))}
      </ul>
    </div>
  );
}
