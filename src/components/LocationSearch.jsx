import { Input, InputGroup, InputLeftElement, Button, HStack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function LocationSearch({ setCity }) {
  const [input, setInput] = useState("");

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
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search by city"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          bg="white"
        />
      </InputGroup>
      <Button colorScheme="red" onClick={handleSearch}>
        Search
      </Button>
    </HStack>
  );
}
