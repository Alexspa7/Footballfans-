document.addEventListener("DOMContentLoaded", () => {
  fetch('api/matches.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('matches');
      container.innerHTML = "";

      // Φιλτράρουμε μόνο Champions League
      const championsMatches = data.matches.filter(m => m.competition === "Champions League");

      if (championsMatches.length === 0) {
        container.innerHTML = "<p>Δεν υπάρχουν σημερινοί αγώνες Champions League.</p>";
        return;
      }

      championsMatches.forEach(match => {
        container.innerHTML += `
          <div style="margin: 10px 0; padding: 10px; border: 1px solid #ccc;">
            <strong>${match.date} - ${match.time}</strong><br>
            ${match.home} vs ${match.away}<br>
            <em>Πρόβλεψη:</em> ${match.prediction}
          </div>
        `;
      });
    })
    .catch(error => {
      console.error('Σφάλμα:', error);
      document.getElementById('matches').innerHTML = "<p>Πρόβλημα φόρτωσης δεδομένων.</p>";
    });
});
