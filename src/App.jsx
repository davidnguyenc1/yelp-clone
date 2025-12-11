import { Box, Container } from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import BusinessList from "./components/BusinessList";

function App() {
  const [query, setQuery] = useState(""); // <-- search term state

  return (
    <Box bg="gray.50" minH="100vh">
      <Navbar />
      <Container maxW="container.lg" py={4}>
        <SearchBar query={query} setQuery={setQuery} /> {/* pass state down */}
        <BusinessList searchQuery={query} /> {/* pass query down */}
      </Container>
    </Box>
  );
}

export default App;
