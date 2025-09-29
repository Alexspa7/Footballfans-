const fs = require("fs");

function main() {
  // Φτιάχνουμε ψεύτικα ματς για demo
  const matches = [
    {
      id: 1,
      home: "ΠΑΟΚ",
      away: "Ολυμπιακός",
      home_odds: 1.80,
      away_odds: 4.20,
      draw_odds: 3.60,
      prediction: "Νίκη ΠΑΟΚ",
    },
    {
      id: 2,
      home: "ΑΕΚ",
      away: "ΠΑΟΚ",
      home_odds: 2.10,
      away_odds: 3.10,
      draw_odds: 3.40,
      prediction: "Νίκη ΑΕΚ",
    },
    {
      id: 3,
      home: "Παναθηναϊκός",
      away: "Ατρόμητος",
      home_odds: 1.50,
      away_odds: 6.00,
      draw_odds: 4.20,
      prediction: "Νίκη Παναθηναϊκός",
    },
  ];

  fs.writeFileSync("matches.json", JSON.stringify(matches, null, 2));
  console.log("✅ matches.json ενημερώθηκε!");
}

main();
