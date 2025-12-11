import { Box, Image, Heading, Text, Stack } from "@chakra-ui/react";

export default function BusinessCard({ business }) {
  return (
    <Box bg="white" shadow="sm" borderRadius="md" overflow="hidden">
      <Image src={business.imageUrl} h="200px" w="100%" objectFit="cover" />
      <Box p={4}>
        <Stack spacing={1}>
          <Heading size="md">{business.name}</Heading>
          <Text color="gray.600">{business.category}</Text>
          <Text>{business.price}</Text>
        </Stack>
      </Box>
    </Box>
  );
}
