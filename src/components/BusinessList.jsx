import { SimpleGrid } from "@chakra-ui/react";
import BusinessCard from "./BusinessCard";

const mockData = [
  {
    id: 1,
    name: "Sushi Place",
    category: "Japanese",
    price: "$$",
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?crop=entropy&cs=tinysrgb&fit=max&h=200&w=400",
  },
  {
    id: 2,
    name: "Pizza House",
    category: "Italian",
    price: "$",
    imageUrl: "https://images.unsplash.com/photo-1601924638867-3ec7ff3a10ab?crop=entropy&cs=tinysrgb&fit=max&h=200&w=400",
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
