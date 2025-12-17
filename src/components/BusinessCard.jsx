import { Box, Image, Heading, Text, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function BusinessCard({ business }) {
  return (
    <Link to={`/business/${business.id}`}>
      <Box bg="white" shadow="sm" borderRadius="md" overflow="hidden" cursor="pointer">
        <Image src={business.image_url} h="200px" w="100%" objectFit="cover" />
        <Box p={4}>
          <Stack spacing={1}>
            <Heading size="md">{business.name}</Heading>
            <Text>⭐ {business.rating}</Text>
            <Text>{business.price}</Text>
            <Text>{business.categories.map(c => c.title).join(", ")}</Text>
          </Stack>
        </Box>
      </Box>
    </Link>
  );
}
