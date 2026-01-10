import { HStack, Button } from "@chakra-ui/react";

const PRICE_OPTIONS = [
  { label: "Any Price", value: null },
  { label: "$", value: "1" }, // Inexpensive
  { label: "$$", value: "2" }, // Moderate
  { label: "$$$", value: "3" }, // Pricey
  { label: "$$$$", value: "4" }, // Very Pricey
];

export default function PriceFilter({ price, setPrice }) {
  return (
    <HStack spacing={2} mb={4} wrap="wrap">
      {PRICE_OPTIONS.map((option) => {
        const isSelected = price === option.value || (price === null && option.value === null);
        return (
          <Button
            key={option.value || "any"}
            size="sm"
            variant={isSelected ? "solid" : "outline"}
            colorScheme={isSelected ? "red" : "gray"}
            onClick={() => setPrice(option.value)}
          >
            {option.label}
          </Button>
        );
      })}
    </HStack>
  );
}

