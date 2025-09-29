import { useEffect, useState } from "react";

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch("/api/index"); // Καλεί το api/index.js
        const data = await res.json();
        setMatches(data.matches || []);
      } catch (err) {
        console.error("Error fetching matches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Champions League Matches</h1>
      {matches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <ul>
          {matches.map((match) => (
            <li key={match.id}>
              {match.homeTeam.name} vs {match.awayTeam.name} - {match.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
