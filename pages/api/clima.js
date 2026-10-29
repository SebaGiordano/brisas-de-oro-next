const LAT = -31.4285
const LON = -64.4872
const BASE = 'https://api.tomorrow.io/v4/weather'

export default async function handler(req, res) {
  const apiKey = process.env.TOMORROW_API_KEY
  if (!apiKey) {
    return res.status(502).json({ error: 'Falta configurar TOMORROW_API_KEY' })
  }

  const params = `location=${LAT},${LON}&apikey=${apiKey}&units=metric`

  try {
    const [rC, rD] = await Promise.all([
      fetch(`${BASE}/realtime?${params}`),
      fetch(`${BASE}/forecast?${params}&timesteps=1d`),
    ])
    if (!rC.ok || !rD.ok) throw new Error(`Tomorrow.io respondió ${rC.status}/${rD.status}`)
    const [realtime, forecast] = await Promise.all([rC.json(), rD.json()])

    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=600')
    res.status(200).json({ realtime, forecast })
  } catch (err) {
    res.status(502).json({ error: err.message })
  }
}
