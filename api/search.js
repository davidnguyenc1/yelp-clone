export default async function handler(req, res) {
    const { lat, lng, term = "restaurants", city } = req.query;
  
    let url = "https://api.yelp.com/v3/businesses/search?limit=12";
  
    if (city) {
      url += `&location=${city}`;
    } else if (lat && lng) {
      url += `&latitude=${lat}&longitude=${lng}`;
    } else {
      return res.status(400).json({ error: "Location required" });
    }
  
    url += `&term=${term}`;
  
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
      });
  
      const data = await response.json();
      res.status(200).json(data.businesses);
    } catch {
      res.status(500).json({ error: "Failed to fetch Yelp data" });
    }
  }
  