export default async function handler(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Missing business ID" });
    }

    // Use native fetch (Vercel Node 18+)
    const response = await fetch(`https://api.yelp.com/v3/businesses/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    });

    if (!response.ok) {
      const text = await response.text(); // get any error message from Yelp
      console.error("Yelp API error:", text);
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    console.error("API function error:", err);
    return res.status(500).json({ error: err.message });
  }
}
