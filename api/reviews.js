export default async function handler(req, res) {
  try {
    const { id } = req.query;
    console.log("Reviews API called with id:", id);

    if (!id) {
      return res.status(400).json({ error: "Missing business ID" });
    }

    if (!process.env.YELP_API_KEY) {
      console.error("YELP_API_KEY is not set");
      return res.status(500).json({ error: "API key not configured" });
    }

    const yelpUrl = `https://api.yelp.com/v3/businesses/${id}/reviews`;
    console.log("Fetching from Yelp:", yelpUrl);

    const response = await fetch(yelpUrl, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    });

    console.log("Yelp response status:", response.status);

    if (!response.ok) {
      let errorData;
      try {
        const text = await response.text();
        errorData = JSON.parse(text);
        console.error("Yelp API error:", response.status, errorData);
      } catch (e) {
        errorData = { error: "Failed to parse error response" };
      }
      
      // If it's a 404, the business might not have reviews - return empty array instead of error
      if (response.status === 404) {
        console.log(`Business ${id} not found or has no reviews - returning empty array`);
        return res.status(200).json([]);
      }
      
      return res.status(response.status).json({ error: errorData });
    }

    const data = await response.json();
    console.log("Yelp API response data:", JSON.stringify(data).substring(0, 200));
    
    // Yelp API returns { reviews: [...] }
    const reviews = data.reviews || [];
    console.log(`Fetched ${reviews.length} reviews for business ${id}`);
    
    return res.status(200).json(reviews);

  } catch (err) {
    console.error("API function error:", err);
    return res.status(500).json({ error: err.message });
  }
}
