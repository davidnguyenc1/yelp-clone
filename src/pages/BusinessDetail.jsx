import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Heading, Image, Text, Spinner, Center, Stack, HStack, AspectRatio, Link, Badge, Button, SimpleGrid } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { formatDistance, calculateDistance } from "../utils/distance";
import BusinessCard from "../components/BusinessCard";

// Fix for default marker icon in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function BusinessDetail() {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [similarBusinesses, setSimilarBusinesses] = useState([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);

  // Scroll to top when business ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

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

  // Fetch similar businesses
  useEffect(() => {
    if (!business || !business.coordinates) return;

    const fetchSimilarBusinesses = async () => {
      setLoadingSimilar(true);
      try {
        // Get the primary category from the business
        const primaryCategory = business.categories?.[0]?.alias || "restaurants";
        const { latitude, longitude } = business.coordinates;

        // Search for businesses in the same category and location
        const url = `/api/search?lat=${latitude}&lng=${longitude}&category=${primaryCategory}&term=${primaryCategory}`;
        const res = await fetch(url);
        
        if (!res.ok) throw new Error("Failed to fetch similar businesses");
        
        const data = await res.json();
        
        // Filter out the current business and limit to 6 results
        let filtered = data
          .filter(b => b.id !== business.id)
          .slice(0, 6);
        
        // Calculate distances if user location is available
        if (userLocation) {
          filtered = filtered.map(b => {
            if (b.coordinates) {
              const dist = calculateDistance(
                userLocation.lat,
                userLocation.lng,
                b.coordinates.latitude,
                b.coordinates.longitude
              );
              return { ...b, distance: dist };
            }
            return b;
          });
        }
        
        setSimilarBusinesses(filtered);
      } catch (err) {
        console.error("Error fetching similar businesses:", err);
        setSimilarBusinesses([]);
      } finally {
        setLoadingSimilar(false);
      }
    };

    fetchSimilarBusinesses();
  }, [business, userLocation]);

  if (!business) return <Center py={10}><Spinner size="xl" /></Center>;

  // Helpers to format hours
  const formatTime = (t) => {
    if (!t) return "";
    const hours = Number(t.slice(0, 2));
    const minutes = t.slice(2);
    const suffix = hours >= 12 ? "PM" : "AM";
    const displayHour = ((hours + 11) % 12) + 1;
    return `${displayHour}:${minutes} ${suffix}`;
  };

  const todayHours = (() => {
    if (!business.hours || !business.hours[0]?.open) return null;
    const today = new Date().getDay(); // 0 = Sunday
    const match = business.hours[0].open.find((o) => o.day === today);
    if (!match) return null;
    return `${formatTime(match.start)} - ${formatTime(match.end)}${match.is_overnight ? " (overnight)" : ""}`;
  })();

  const allWeekHours = (() => {
    if (!business.hours || !business.hours[0]?.open) return [];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const grouped = new Map();
    business.hours[0].open.forEach((o) => {
      const key = o.day;
      const slot = `${formatTime(o.start)} - ${formatTime(o.end)}${o.is_overnight ? " (overnight)" : ""}`;
      grouped.set(key, [...(grouped.get(key) || []), slot]);
    });
    const today = new Date().getDay();
    return dayNames.map((name, idx) => ({
      label: name,
      slots: grouped.get(idx) || [],
      isToday: idx === today,
    }));
  })();

  // Generate Google Maps directions URL
  const getDirectionsUrl = () => {
    if (!business.coordinates) {
      // Fallback to address-based directions
      const address = business.location?.display_address?.join(", ") || business.name;
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    }
    
    const { latitude, longitude } = business.coordinates;
    let url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    
    // Add origin if user location is available
    if (userLocation) {
      url += `&origin=${userLocation.lat},${userLocation.lng}`;
    }
    
    return url;
  };

  return (
    <Box maxW="container.md" mx="auto" p={4}>
      <AspectRatio ratio={16 / 9} w="100%">
        <Image
          src={business.image_url}
          alt={business.name}
          borderRadius="md"
          objectFit="cover"
        />
      </AspectRatio>
      <Heading mt={4}>{business.name}</Heading>

      <Stack spacing={3} mt={2}>
        <HStack spacing={2} align="center" flexWrap="wrap">
          <HStack spacing={1}>
            <Text>⭐ {business.rating}</Text>
            {business.review_count && (
              <Text fontSize="sm" color="gray.600">
                · {business.review_count} {business.review_count === 1 ? "review" : "reviews"}
              </Text>
            )}
          </HStack>
          {business.price && (
            <Text fontSize="md" color="gray.700">
              {business.price}
            </Text>
          )}
          {distance && (
            <Text fontSize="md" color="gray.600">
              • {formatDistance(distance)} away
            </Text>
          )}
          {business.hours?.[0]?.is_open_now !== undefined && (
            <Badge colorScheme={business.hours[0].is_open_now ? "green" : "red"}>
              {business.hours[0].is_open_now ? "Open now" : "Closed"}
            </Badge>
          )}
        </HStack>

        <Text>{business.categories.map(c => c.title).join(", ")}</Text>

        {/* Hours Section */}
        {(todayHours || allWeekHours.length > 0) && (
          <Box pt={4}>
            <Heading size="md" mb={3}>Hours</Heading>
            {todayHours && (
              <Text color="gray.700" mb={2}>Today: {todayHours}</Text>
            )}

            {allWeekHours.length > 0 && (
              <Stack spacing={1} pt={1}>
                {allWeekHours.map(({ label, slots, isToday }) => (
                  <HStack
                    key={label}
                    justify="space-between"
                    bg={isToday ? "gray.100" : "transparent"}
                    borderRadius="md"
                    px={2}
                    py={1}
                  >
                    <Text fontWeight={isToday ? "bold" : "normal"} color="gray.800">
                      {label}
                    </Text>
                    <Text color="gray.700">
                      {slots.length > 0 ? slots.join(", ") : "Closed"}
                    </Text>
                  </HStack>
                ))}
              </Stack>
            )}
          </Box>
        )}

        {/* Location Section */}
        <Box pt={4}>
          <Heading size="md" mb={3}>Location</Heading>
          <Stack spacing={1}>
            {business.location.display_address && (
              <Stack spacing={0}>
                {business.location.display_address.map((line, idx) => (
                  <Text key={idx}>{line}</Text>
                ))}
              </Stack>
            )}
            <Text>{business.display_phone}</Text>
          </Stack>
        </Box>

        {/* Map Section */}
        {business.coordinates && (
          <Box pt={4}>
            <Heading size="md" mb={3}>Map</Heading>
            <Button
              as="a"
              href={getDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              colorScheme="blue"
              leftIcon={<ExternalLinkIcon />}
              mb={3}
            >
              Get Directions
            </Button>
            <Box
              borderRadius="md"
              overflow="hidden"
              border="1px solid"
              borderColor="gray.200"
              height="400px"
              w="100%"
            >
              <MapContainer
                center={[business.coordinates.latitude, business.coordinates.longitude]}
                zoom={15}
                style={{ height: "100%", width: "100%", borderRadius: "8px" }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[business.coordinates.latitude, business.coordinates.longitude]}>
                  <Popup>
                    <Text fontWeight="bold">{business.name}</Text>
                    {business.location?.display_address && (
                      <Text fontSize="sm">
                        {business.location.display_address.join(", ")}
                      </Text>
                    )}
                  </Popup>
                </Marker>
              </MapContainer>
            </Box>
          </Box>
        )}

        {/* Similar Businesses Section */}
        {similarBusinesses.length > 0 && (
          <Box pt={6}>
            <Heading size="md" mb={4}>Similar Businesses</Heading>
            {loadingSimilar ? (
              <Center py={10}>
                <Spinner size="lg" />
              </Center>
            ) : (
              <SimpleGrid columns={[1, 2, 3]} spacing={5}>
                {similarBusinesses.map((b) => (
                  <BusinessCard key={b.id} business={b} />
                ))}
              </SimpleGrid>
            )}
          </Box>
        )}

        {/* Yelp Link */}
        {business.url && (
          <Box pt={4}>
            <Link href={business.url} color="blue.500" isExternal>
              View on Yelp
            </Link>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
