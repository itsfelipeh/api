// archivo: api/report.js (para usar en Vercel o Next.js API Routes)

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", message: "Método no permitido" });
  }

  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const { nombre, comentario, latitud, longitud } = req.body;

    const scriptURL = "https://script.google.com/macros/s/AKfycbyWPhjg_ITeYscL2PGI_jaB1fTKepHdqDqFdR8moH1xlNjwQWWzwuG33RW-aZi3HiOn/exec";

    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, comentario, latitud, longitud })
    });

    const result = await response.json();
    return res.status(200).json(result);
  } catch (err) {
    console.error("Error en el proxy:", err);
    return res.status(500).json({ status: "error", message: "Error interno en el proxy" });
  }
}
