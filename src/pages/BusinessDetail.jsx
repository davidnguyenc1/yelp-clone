import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Heading, Image, Text, Spinner, Center, Stack } from "@chakra-ui/react";

export default function BusinessDetail() {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/business?id=${id}`)
      .then(res => res.json())
      .then(data => setBusiness(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!business) return <Center py={10}><Spinner size="xl" /></Center>;

  return (
    <Box maxW="container.md" mx="auto" p={4}>
      <Image src={business.image_url} borderRadius="md" />
      <Heading mt={4}>{business.name}</Heading>
      <Text>⭐ {business.rating}</Text>
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
