export default async function handler(req, res) {
  const {
    lat,
    lng,
    term = "restaurants",
    city,
    category,
    radius,
  } = req.query;

  let url = "https://api.yelp.com/v3/businesses/search?limit=12";

  if (city) {
    url += `&location=${city}`;
  } else if (lat && lng) {
    url += `&latitude=${lat}&longitude=${lng}`;
  } else {
    return res.status(400).json({ error: "Location required" });
  }

  // Search term
  url += `&term=${term}`;

  // Category filter (food only)
  if (category) {
    url += `&categories=${category}`;
  }

  // Radius filter (in meters, only works with lat/lng, not city search)
  if (radius && lat && lng) {
    url += `&radius=${radius}`;
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    res.status(200).json(data.businesses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Yelp data" });
  }
}
