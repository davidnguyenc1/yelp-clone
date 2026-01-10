import { Routes, Route } from "react-router-dom";

import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import BusinessList from "./components/BusinessList";
import LocationSearch from "./components/LocationSearch";
import BusinessDetail from "./pages/BusinessDetail";
import CategoryFilter from "./components/CategoryFilter";
import DistanceFilter from "./components/DistanceFilter";
import PriceFilter from "./components/PriceFilter";


function App() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [radius, setRadius] = useState(null);
  const [price, setPrice] = useState(null);
  const bg = useColorModeValue("gray.50", "gray.900");

  // Try GPS first
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => setLocation(null)
    );
  }, []);

  return (
    <Box bg={bg} minH="100vh">
      <Navbar />
      <Container maxW="container.lg" py={4}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar query={query} setQuery={setQuery} />
                <LocationSearch setCity={setCity} />
                <CategoryFilter category={category} setCategory={setCategory} />
                <DistanceFilter radius={radius} setRadius={setRadius} />
                <PriceFilter price={price} setPrice={setPrice} />
                
                <BusinessList
                  searchQuery={query}
                  location={location}
                  city={city}
                  category={category}
                  radius={radius}
                  price={price}
                />
              </>
            }
          />
          <Route path="/business/:id" element={<BusinessDetail />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;