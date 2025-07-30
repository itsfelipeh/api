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
    const {
      nombre,
      correo,
      telefono,
      calle,
      numeracion,
      poste,
      tipo_problema,
      comentario,
      latitud,
      longitud
    } = req.body;

    const scriptURL = "https://script.google.com/macros/s/AKfycbzn-G0I3rrLfnyoPZduf505fbgpigYdrkMERAI86HDpIJ8b0bu2lFmgvQmqKqEK8GFO2w/exec";

    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        correo,
        telefono,
        calle,
        numeracion,
        poste,
        tipo_problema,
        comentario,
        latitud,
        longitud
      })
    });

    const text = await response.text();

    try {
      const json = JSON.parse(text);
      return res.status(200).json(json);
    } catch (e) {
      console.error("No se pudo parsear JSON:", text);
      return res.status(502).json({
        status: "error",
        message: "Respuesta inválida del servidor Apps Script",
        raw: text
      });
    }

  } catch (err) {
    console.error("Error en el proxy:", err);
    return res.status(500).json({ status: "error", message: "Error interno en el proxy" });
  }
}
