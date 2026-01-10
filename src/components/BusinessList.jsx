import { SimpleGrid, Spinner, Center, Text, HStack, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BusinessCard from "./BusinessCard";

export default function BusinessList({ searchQuery, location, city, category, radius }) {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortMode, setSortMode] = useState("distance"); // distance | rating | best

  useEffect(() => {
    if (!location && !city) return;

    const fetchBusinesses = async () => {
      setLoading(true);
      setError(null);

      let url = city
        ? `/api/search?city=${city}&term=${searchQuery}`
        : `/api/search?lat=${location.lat}&lng=${location.lng}&term=${searchQuery}`;

      // Always scope to food/restaurant categories; override with selected category
      const selectedCategory = category || "restaurants";
      url += `&category=${selectedCategory}`;

      // Add radius filter if specified (only works with lat/lng, not city)
      if (radius && location) {
        url += `&radius=${radius}`;
      }

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch businesses");
        const data = await res.json();
        setBusinesses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [searchQuery, location, city, category, radius]);

  if (loading) return <Center py={10}><Spinner size="xl" /></Center>;
  if (error) return <Center py={10}><Text color="red.500">{error}</Text></Center>;
  if (businesses.length === 0) return <Center py={10}><Text>No businesses found</Text></Center>;

  // Sorting helpers
  const sortedBusinesses = [...businesses].sort((a, b) => {
    const distA = a.distance ?? Infinity;
    const distB = b.distance ?? Infinity;
    const ratingA = a.rating ?? 0;
    const ratingB = b.rating ?? 0;

    if (sortMode === "rating") {
      // Highest rating, then closest
      if (ratingB !== ratingA) return ratingB - ratingA;
      return distA - distB;
    }

    if (sortMode === "best") {
      // Balance rating + distance: primary rating, secondary distance
      // Slightly penalize long distance even if rating is high
      const scoreA = ratingA * 10 - distA / 1000; // 1 mile ~ 1.6km; tune weight
      const scoreB = ratingB * 10 - distB / 1000;
      if (scoreB !== scoreA) return scoreB - scoreA;
      return distA - distB;
    }

    // Default: distance
    return distA - distB;
  });

  return (
    <>
      <HStack spacing={2} mb={3}>
        <Button
          size="sm"
          variant={sortMode === "distance" ? "solid" : "outline"}
          colorScheme="red"
          onClick={() => setSortMode("distance")}
        >
          Closest
        </Button>
        <Button
          size="sm"
          variant={sortMode === "rating" ? "solid" : "outline"}
          colorScheme="red"
          onClick={() => setSortMode("rating")}
        >
          Highest Rated
        </Button>
        <Button
          size="sm"
          variant={sortMode === "best" ? "solid" : "outline"}
          colorScheme="red"
          onClick={() => setSortMode("best")}
        >
          Best Mix
        </Button>
      </HStack>

      <SimpleGrid columns={[1, 2, 3]} spacing={5}>
        {sortedBusinesses.map((b) => (
          <BusinessCard key={b.id} business={b} />
        ))}
      </SimpleGrid>
    </>
  );
}
