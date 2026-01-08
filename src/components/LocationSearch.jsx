import { Input, InputGroup, InputLeftElement, Button, HStack, useColorModeValue } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function LocationSearch({ setCity }) {
  const [input, setInput] = useState("");
  const bg = useColorModeValue("white", "gray.700");
  const iconColor = useColorModeValue("gray.400", "gray.500");

  const handleSearch = () => {
    setCity(input.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <HStack mb={5}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color={iconColor} />
        </InputLeftElement>
        <Input
          placeholder="Search by city"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          bg={bg}
        />
      </InputGroup>
      <Button colorScheme="red" onClick={handleSearch}>
        Search
      </Button>
    </HStack>
  );
}
