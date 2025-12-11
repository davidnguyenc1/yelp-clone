import { SimpleGrid } from "@chakra-ui/react";
import BusinessCard from "./BusinessCard";

const mockData = [
  {
    id: 1,
    name: "Sushi Place",
    category: "Japanese",
    price: "$$",
    imageUrl: "https://source.unsplash.com/random/400x300/?sushi",
  },
  {
    id: 2,
    name: "Pizza House",
    category: "Italian",
    price: "$",
    imageUrl: "https://source.unsplash.com/random/400x300/?pizza",
  },
];

export default function BusinessList() {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={5}>
      {mockData.map((b) => (
        <BusinessCard key={b.id} business={b} />
      ))}
    </SimpleGrid>
  );
}
