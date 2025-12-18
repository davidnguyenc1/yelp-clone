import { SimpleGrid, Spinner, Center, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BusinessCard from "./BusinessCard";

export default function BusinessList({ searchQuery, location, city, category }) {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location && !city) return;

    const fetchBusinesses = async () => {
      setLoading(true);
      setError(null);

      const url = city
        ? `/api/search?city=${city}&term=${searchQuery}`
        : `/api/search?lat=${location.lat}&lng=${location.lng}&term=${searchQuery}`;

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
  }, [searchQuery, location, city]);

  if (loading) return <Center py={10}><Spinner size="xl" /></Center>;
  if (error) return <Center py={10}><Text color="red.500">{error}</Text></Center>;
  if (businesses.length === 0) return <Center py={10}><Text>No businesses found</Text></Center>;

  // Filter businesses by category if one is selected
  const filteredBusinesses = category
    ? businesses.filter((b) =>
        b.categories.some((c) => c.alias === category.toLowerCase())
      )
    : businesses;

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={5}>
      {filteredBusinesses.map((b) => (
        <BusinessCard key={b.id} business={b} />
      ))}
    </SimpleGrid>
  );
}
