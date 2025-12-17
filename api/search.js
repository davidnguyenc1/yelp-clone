import fetch from "node-fetch";

export default async function handler(req, res) {
  const { term, city, lat, lng } = req.query;

  let url;
  if (city) {
    url = `https://api.yelp.com/v3/businesses/search?location=${city}&term=${term || ""}&limit=12`;
  } else if (lat && lng) {
    url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lng}&term=${term || ""}&limit=12`;
  } else {
    return res.status(400).json({ error: "Missing location" });
  }

  try {
    const apiRes = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` },
    });
    const data = await apiRes.json();
    res.status(200).json(data.businesses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
