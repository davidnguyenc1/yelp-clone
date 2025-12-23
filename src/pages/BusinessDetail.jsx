import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Heading, Image, Text, Spinner, Center, Stack, HStack, SimpleGrid } from "@chakra-ui/react";
import { formatDistance, calculateDistance } from "../utils/distance";

export default function BusinessDetail() {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => setUserLocation(null)
    );
  }, []);

  // Fetch business data
  useEffect(() => {
    if (!id) return;

    fetch(`/api/business?id=${id}`)
      .then(res => res.json())
      .then(data => setBusiness(data))
      .catch(err => console.error(err));
  }, [id]);

  // Calculate distance when both business and user location are available
  useEffect(() => {
    if (business && userLocation && business.coordinates) {
      const dist = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        business.coordinates.latitude,
        business.coordinates.longitude
      );
      setDistance(dist);
    }
  }, [business, userLocation]);

  if (!business) return <Center py={10}><Spinner size="xl" /></Center>;

  // Build a gallery of up to 3 unique photos (Yelp detail returns up to 3)
  const galleryPhotos = Array.from(
    new Set([
      ...(business.photos ?? []),
      business.image_url,
    ].filter(Boolean))
  ).slice(0, 3);

  return (
    <Box maxW="container.md" mx="auto" p={4}>
      <Image src={business.image_url} borderRadius="md" />
      {galleryPhotos.length > 0 && (
        <SimpleGrid columns={[1, 2, 3]} spacing={3} mt={3}>
          {galleryPhotos.map((photo, idx) => (
            <Image
              key={photo}
              src={photo}
              alt={`${business.name} photo ${idx + 1}`}
              borderRadius="md"
              objectFit="cover"
              w="100%"
              h="180px"
            />
          ))}
        </SimpleGrid>
      )}
      <Heading mt={4}>{business.name}</Heading>
      <HStack spacing={2} mt={2}>
        <Text>⭐ {business.rating}</Text>
        {distance && (
          <Text fontSize="md" color="gray.600">
            • {formatDistance(distance)} away
          </Text>
        )}
      </HStack>
      <Text>{business.price}</Text>
      <Text>{business.categories.map(c => c.title).join(", ")}</Text>
      <Stack mt={2}>
        <Text>{business.location.address1}, {business.location.city}</Text>
        <Text>{business.display_phone}</Text>
        <Text>{business.url}</Text>
      </Stack>
    </Box>
  );
}
