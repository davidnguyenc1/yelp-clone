import { Flex, Heading, Spacer, Button } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Flex
      bg="white"
      px={6}
      py={4}
      shadow="sm"
      align="center"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Heading size="md" color="red.500">Yelp Clone</Heading>
      <Spacer />
      <Button colorScheme="red" variant="outline">
        Login
      </Button>
    </Flex>
  );
}
