import { HStack, Button } from "@chakra-ui/react";

const DISTANCE_OPTIONS = [
  { label: "5 miles", value: 8047 }, // 5 miles in meters
  { label: "10 miles", value: 16093 }, // 10 miles in meters
  { label: "15 miles", value: 24140 }, // 15 miles in meters
  { label: "25 miles", value: 40234 }, // 25 miles in meters
  { label: "40 miles", value: 64374 }, // 40 miles in meters
];

export default function DistanceFilter({ radius, setRadius }) {
  return (
    <HStack spacing={2} mb={4} wrap="wrap">
      <Button
        size="sm"
        variant={!radius ? "solid" : "outline"}
        colorScheme={!radius ? "red" : "gray"}
        onClick={() => setRadius(null)}
      >
        Any Distance
      </Button>
      {DISTANCE_OPTIONS.map((option) => (
        <Button
          key={option.value}
          size="sm"
          variant={radius === option.value ? "solid" : "outline"}
          colorScheme={radius === option.value ? "red" : "gray"}
          onClick={() => setRadius(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </HStack>
  );
}

