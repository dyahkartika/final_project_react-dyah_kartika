import { Box, Center, Heading } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Detail from "./Detail";
import NotFound from "./NotFound";

const App = () => {
  const MyRouter = () => <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="card/:id" element={<Detail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>; 

  return (

    <div className="App">
      {/* Navbar */}
      <Box w="100vw" bg='#E28358' p={6}>
        <Center>
          <Heading as="h1" color="#5E3F2E">
            Yugi-Oh Card Deck
          </Heading>
        </Center>
      </Box>
      {/* Route */}
      <MyRouter />
    </div>
  );
};

export default App;
