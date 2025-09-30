// api/ai.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { home, away } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Είσαι ποδοσφαιρικός αναλυτής. Δίνεις σύντομες προβλέψεις." },
          { role: "user", content: `Αγώνας: ${home} vs ${away}. Δώσε πρόβλεψη με πιθανότητες.` }
        ],
        max_tokens: 120
      })
    });

    const data = await response.json();
    const prediction = data.choices?.[0]?.message?.content || "Δεν βρέθηκε πρόβλεψη.";

    res.status(200).json({ prediction });
  } catch (err) {
    res.status(500).json({ error: "AI request failed", details: err.message });
  }
}
