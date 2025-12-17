import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Heading, Image, Text, Spinner, Center } from "@chakra-ui/react";

export default function BusinessDetail() {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    //fetch(`/api/business/${id}`)
    const API_BASE = import.meta.env.VITE_BASE_PATH || "";
    fetch(`${API_BASE}/api/business/${id}`)  
      .then((res) => res.json())
      .then((data) => setBusiness(data));
  }, [id]);

  if (!business) {
    return (
      <Center py={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box maxW="container.md" mx="auto" p={4}>
      <Image src={business.image_url} borderRadius="md" />
      <Heading mt={4}>{business.name}</Heading>
      <Text>⭐ {business.rating}</Text>
      <Text>{business.location.address1}</Text>
    </Box>
  );
}
