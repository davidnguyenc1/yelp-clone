export default async function handler(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Missing business ID" });
    }

    const response = await fetch(`https://api.yelp.com/v3/businesses/${id}/reviews`, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Yelp API error:", text);
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    // Yelp API returns { reviews: [...] }
    const reviews = data.reviews || [];
    console.log(`Fetched ${reviews.length} reviews for business ${id}`);
    return res.status(200).json(reviews);

  } catch (err) {
    console.error("API function error:", err);
    return res.status(500).json({ error: err.message });
  }
}
