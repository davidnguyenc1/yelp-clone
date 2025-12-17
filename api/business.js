import fetch from "node-fetch";

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Missing ID" });

  try {
    const apiRes = await fetch(`https://api.yelp.com/v3/businesses/${id}`, {
      headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` },
    });
    if (!apiRes.ok) {
      const text = await apiRes.text();
      return res.status(apiRes.status).json({ error: text });
    }
    const data = await apiRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
