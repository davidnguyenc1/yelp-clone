import RestaurantCard from "./RestaurantCard";

export default function RestaurantList({ restaurants }) {
  return (
    <div>
      {restaurants.map((r) => (
        <RestaurantCard key={r.id} restaurant={r} />
      ))}
    </div>
  );
}
