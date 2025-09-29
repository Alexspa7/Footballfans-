import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/index");
        const json = await res.json();
        setData(json.results || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Football Matches</h1>
      {data.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        data.map((comp) => (
          <div key={comp.competition} style={{ marginBottom: "30px" }}>
            <h2>{comp.competition}</h2>
            <ul>
              {comp.matches.slice(0, 10).map((match) => (
                <li key={match.id}>
                  {match.homeTeam.name} vs {match.awayTeam.name} - {match.status}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
