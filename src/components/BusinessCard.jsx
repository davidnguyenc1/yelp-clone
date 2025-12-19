import { Box, Image, Heading, Text, Stack, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { formatDistance } from "../utils/distance";

export default function BusinessCard({ business }) {
  return (
    <Link to={`/business/${business.id}`}>
      <Box bg="white" shadow="sm" borderRadius="md" overflow="hidden" cursor="pointer">
        <Image src={business.image_url} h="200px" w="100%" objectFit="cover" />
        <Box p={4}>
          <Stack spacing={1}>
            <Heading size="md">{business.name}</Heading>
            <HStack spacing={2}>
              <Text>⭐ {business.rating}</Text>
              {business.distance && (
                <Text fontSize="sm" color="gray.600">
                  • {formatDistance(business.distance)}
                </Text>
              )}
            </HStack>
            <Text>{business.price}</Text>
            <Text>{business.categories.map(c => c.title).join(", ")}</Text>
          </Stack>
        </Box>
      </Box>
    </Link>
  );
}
