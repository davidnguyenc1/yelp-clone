import { Flex, Heading, Spacer, Button, IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Flex
      bg={bg}
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
      <IconButton
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        mr={2}
      />
      <Button colorScheme="red" variant="outline">Login</Button>
    </Flex>
  );
}
