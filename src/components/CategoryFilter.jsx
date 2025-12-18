import { HStack, Button } from "@chakra-ui/react";

const FOOD_CATEGORIES = [
    { label: "All", value: "" },
    { label: "Italian", value: "italian" },
    { label: "Mexican", value: "mexican" },
    { label: "Japanese", value: "japanese" },
    { label: "Chinese", value: "chinese" },
    { label: "Korean", value: "korean" },
    { label: "Thai", value: "thai" },
    { label: "Indian", value: "indpak" },
    { label: "American", value: "tradamerican" },
    { label: "Burgers", value: "burgers" },
    { label: "Pizza", value: "pizza" },
    { label: "Seafood", value: "seafood" },
    { label: "BBQ", value: "bbq" },
    { label: "Vietnamese", value: "vietnamese" },
    { label: "Mediterranean", value: "mediterranean" },
    { label: "Greek", value: "greek" },
    { label: "French", value: "french" },
  ];
  

export default function CategoryFilter({ category, setCategory }) {
  return (
    <HStack spacing={2} mb={4} wrap="wrap">
      {FOOD_CATEGORIES.map((c) => (
        <Button
          key={c.label}
          size="sm"
          colorScheme={category === c.value ? "red" : "gray"}
          onClick={() => setCategory(c.value)}
        >
          {c.label}
        </Button>
      ))}
    </HStack>
  );
}
