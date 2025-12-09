export default function RestaurantCard({ restaurant }) {
    return (
      <div style={{ border: "1px solid #ccc", padding: "10px", 
        borderRadius: "6px", marginBottom: "10px" }}>
        <h3>{restaurant.name}</h3>
        <p>⭐ {restaurant.rating}</p>
        <p>{restaurant.category}</p>
      </div>
    );
  }
  