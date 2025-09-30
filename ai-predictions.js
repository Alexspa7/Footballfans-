// ai-predictions.js
// --- Μη ξεχάσεις: αυτό το αρχείο περιέχει το API key (το οποίο πρέπει να προστατεύεις)
// Αν θέλεις αυξημένη ασφάλεια, χρησιμοποίησε serverless proxy (παρακάτω έχω παράδειγμα).

const API_KEY = "64c9342f1b74487f97e78ec87b9ff43e"; // <- το κλειδί που έδωσες
// endpoint για Champions League - θα παίρνει τα σημερινά (dateFrom & dateTo ίσο με σήμερα)
function yyyy_mm_dd(d) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

async function loadTodayMatches() {
  const today = new Date();
  const dateStr = yyyy_mm_dd(today);
  // Football-data.org v4 endpoint
  const url = `https://api.football-data.org/v4/competitions/CL/matches?dateFrom=${dateStr}&dateTo=${dateStr}`;

  const container = document.getElementById("matches");
  container.innerHTML = `<p class="small">Φόρτωση αγώνων για ${dateStr}...</p>`;

  try {
    const res = await fetch(url, {
      headers: { "X-Auth-Token": API_KEY }
    });

    if (!res.ok) {
      // πιθανό σφάλμα (403/401/429 ή CORS)
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }

    const data = await res.json();

    // Αν δεν υπάρχουν αγώνες:
    if (!data.matches || data.matches.length === 0) {
      container.innerHTML = `<p class="small">Δεν βρέθηκαν αγώνες Champions League για ${dateStr}.</p>`;
      return;
    }

    // Διάλεξε μόνο τα matches (αν χρειάζεται μπορείς να φιλτράρεις)
    container.innerHTML = ""; // καθάρισμα
    data.matches.forEach(m => {
      const dateIso = m.utcDate || "";
      const time = dateIso ? dateIso.substring(11,16) : "";
      const home = m.homeTeam?.name || m.homeTeam;
      const away = m.awayTeam?.name || m.awayTeam;

      // Φτιάχνουμε "AI πρόβλεψη" — εδώ έχουμε απλό αλγόριθμο (μπορείς να βελτιώσεις)
      const prediction = makePrediction(home, away);

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="meta">${dateStr} - ${time}  ·  ${m.venue ? m.venue : ""}</div>
        <div class="teams"><span>${escapeHtml(home)}</span>  vs  <span>${escapeHtml(away)}</span></div>
        <div class="prediction">🤖 Πρόβλεψη AI: <strong>${prediction}</strong></div>
        <div class="small">Πηγή: Football-Data.org</div>
      `;
      container.appendChild(card);
    });

  } catch (err) {
    console.error("Error fetching matches:", err);
    // Εμφάνιση φιλικού μηνύματος
    container.innerHTML = `<p class="error">Πρόβλημα σύνδεσης με το API: ${escapeHtml(err.message)}.<br>Αν χρησιμοποιείς GitHub Pages πιθανόν να υπάρχει CORS ή το API key δεν είναι αποδεκτό από τον server (βλέπε οδηγίες για proxy παρακάτω).</p>`;
  }
}

// Απλή «AI» πρόβλεψη — συνδυασμός τυχαίου και μικρής στάθμισης γηπεδούχου
function makePrediction(home, away) {
  // απλή ιδέα: home advantage + τυχαιότητα
  const options = ["1","Χ","2","Over 2.5","Under 2.5","GG","No GG"];
  // μικρή βαρύτητα σε δυνατές ομάδες με keywords (μπορείς να επεκτείνεις)
  const strongHosts = ["Real Madrid","Bayern","Manchester City","Liverpool","Barcelona","Juventus","Paris"];
  let weights = options.map(_ => 1);

  // αν home είναι ισχυρή, αυξάνουμε πιθανότητα για 1
  if (strongHosts.some(s => home.includes(s))) {
    weights[0] += 2; // θέση 0 = "1"
  }
  // μικρό random bias
  weights = weights.map(w => w + Math.random()*1.2);

  // κανονικοποίηση & επιλογή
  const total = weights.reduce((a,b)=>a+b,0);
  let r = Math.random() * total;
  for (let i=0;i<weights.length;i++){
    r -= weights[i];
    if (r <= 0) return options[i];
  }
  return options[0];
}

// απλό escape για html
function escapeHtml(text) {
  if (!text) return "";
  return String(text).replace(/[&<>"']/g, function(m){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]);
  });
}

// εκκίνηση
loadTodayMatches();
