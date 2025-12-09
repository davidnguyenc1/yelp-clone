import { useState } from "react";
import { restaurants } from "./data";
import SearchBar from "./components/SearchBar";
import RestaurantList from "./components/RestaurantList";

function App() {
  const [search, setSearch] = useState("");

  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", paddingTop: "20px" }}>
      <h1>Yelp Clone</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <RestaurantList restaurants={filteredRestaurants} />
    </div>
  );
}

export default App;
