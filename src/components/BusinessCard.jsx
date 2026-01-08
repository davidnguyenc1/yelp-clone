import { Box, Image, Heading, Text, Stack, HStack, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { formatDistance } from "../utils/distance";

export default function BusinessCard({ business }) {
  const bg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Link to={`/business/${business.id}`}>
      <Box bg={bg} shadow="sm" borderRadius="md" overflow="hidden" cursor="pointer" transition="all 0.2s" _hover={{ shadow: "md", transform: "translateY(-2px)" }}>
        <Image src={business.image_url} h="200px" w="100%" objectFit="cover" />
        <Box p={4}>
          <Stack spacing={1}>
            <Heading size="md">{business.name}</Heading>
            <HStack spacing={2}>
              <Text>⭐ {business.rating}</Text>
              {business.distance && (
                <Text fontSize="sm" color={textColor}>
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
