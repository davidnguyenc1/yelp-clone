import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <InputGroup mb={5}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.400" />
      </InputLeftElement>
      <Input
        bg="white"
        placeholder="Search restaurants, cafes, bars..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </InputGroup>
  );
}
