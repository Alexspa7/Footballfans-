document.addEventListener("DOMContentLoaded", () => {
  fetch('api/matches.json')
    .then(response => response.json())
    .then(data => {
      const matches = data.matches; // Παίρνουμε τα ματς
      const container = document.getElementById('matches');
      container.innerHTML = "";

      if (matches.length === 0) {
        container.innerHTML = "<p>Δεν υπάρχουν αγώνες.</p>";
        return;
      }

      matches.forEach(match => {
        container.innerHTML += `
          <div style="margin: 10px 0; padding: 10px; border: 1px solid #ccc;">
            <strong>${match.competition}</strong><br>
            ${match.date} ${match.time}<br>
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
