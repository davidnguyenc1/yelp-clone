import { Box, Container } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import BusinessList from "./components/BusinessList";

function App() {
  return (
    <Box bg="gray.50" minH="100vh">
      <Navbar />
      <Container maxW="container.lg" py={4}>
        <SearchBar />
        <BusinessList />
      </Container>
    </Box>
  );
}

export default App;
