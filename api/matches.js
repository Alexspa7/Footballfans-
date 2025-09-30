export default function handler(req, res) {
  const matches = [
    {
      date: "2025-09-30",
      competition: "Champions League",
      home: "Real Madrid",
      away: "Bayern Munich",
      time: "21:00",
      prediction: "Over 2.5"
    },
    {
      date: "2025-09-30",
      competition: "Champions League",
      home: "Barcelona",
      away: "Liverpool",
      time: "22:00",
      prediction: "GG"
    }
  ];

  res.status(200).json({ matches });
}
