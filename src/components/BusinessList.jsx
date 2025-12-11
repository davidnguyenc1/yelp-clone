import { SimpleGrid } from "@chakra-ui/react";
import BusinessCard from "./BusinessCard";

const mockData = [
  {
    id: 1,
    name: "Sushi Place",
    category: "Japanese",
    price: "$$",
    imageUrl: "https://via.placeholder.com/400x200?text=Sushi+Place",
  },
  {
    id: 2,
    name: "Pizza House",
    category: "Italian",
    price: "$",
    imageUrl: "https://via.placeholder.com/400x200?text=Pizza+House",
  },
];

export default function BusinessList({ searchQuery }) {
  const filteredData = mockData.filter(
    (b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={5}>
      {filteredData.map((b) => (
        <BusinessCard key={b.id} business={b} />
      ))}
    </SimpleGrid>
  );
}
