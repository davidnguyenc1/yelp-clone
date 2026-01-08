import { InputGroup, InputLeftElement, Input, useColorModeValue } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function SearchBar({ query, setQuery }) {
  const bg = useColorModeValue("white", "gray.700");
  const iconColor = useColorModeValue("gray.400", "gray.500");

  return (
    <InputGroup mb={5}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color={iconColor} />
      </InputLeftElement>
      <Input
        bg={bg}
        placeholder="Search restaurants, cafes, bars..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </InputGroup>
  );
}
