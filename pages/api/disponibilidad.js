export default async function handler(req, res) {
  const params = new URLSearchParams(req.query).toString()
  const backendUrl = `http://localhost:5272/api/disponibilidad${params ? `?${params}` : ''}`

  try {
    const response = await fetch(backendUrl)
    const data = await response.json()
    res.status(response.status).json(data)
  } catch (err) {
    res.status(502).json({ error: 'No se pudo conectar con el backend', detail: err.message })
  }
}
