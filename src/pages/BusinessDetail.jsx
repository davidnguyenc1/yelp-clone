import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Heading, Image, Text, Spinner, Center, Stack, HStack, AspectRatio, Link, Badge } from "@chakra-ui/react";
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
        <HStack spacing={2} align="center">
          <Text>⭐ {business.rating}</Text>
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

        <Text>{business.price}</Text>

        <Text>{business.categories.map(c => c.title).join(", ")}</Text>

        {todayHours && (
          <Text color="gray.700">Today: {todayHours}</Text>
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

        <Stack spacing={1} pt={2}>
          <Text>{business.location.address1}, {business.location.city}</Text>
          <Text>{business.display_phone}</Text>
          <Link href={business.url} color="blue.500" isExternal>
            {business.url}
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}
