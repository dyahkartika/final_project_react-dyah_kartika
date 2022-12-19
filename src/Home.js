import { useState, useEffect } from "react";
import Cards from "./Cards";
// import { useParams } from "react-router-dom";
import { SimpleGrid, Select, Center, Box } from "@chakra-ui/react";

function Home() {
  const [yugiohData, setYugiohData] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg&level=4";
        const response = await fetch(url);
        const data = await response.json();
        setYugiohData(data.data);// perhatikan hasil dari fetch 
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  function sortData(type) {
    if (type === "Name") {
      setYugiohData([...yugiohData].sort((a, b) => a.name > b.name ? 1 : a.name === b.name ? 1 : -1))
    } else if (type === "Attack") {
      setYugiohData([...yugiohData].sort((a, b) => a.atk - b.atk))
    } else if (type === "Defence") {
      setYugiohData([...yugiohData].sort((a, b) => a.def - b.def))
    }
  }

  const selectChange = (event) => {
    console.log(event.target.value);
    sortData(event.target.value);
  }

  if (loading) return <h1>Loading...</h1>
  // console.log(yugiData);
  return (
    <Box bg="#F8CFB1">
      <div>
        <Center>
          <Select bg="white" name="sort" onChange={selectChange} variant='outline' width='md' my={7}>
            <option value="">Sort by</option>
            <option value="Name">Name</option>
            <option value="Attack">Attack</option>
            <option value="Defence">Defence</option>
          </Select>
        </Center>
      </div>

      <SimpleGrid columns={2} spacing={4} >
        <Cards card={yugiohData} />
      </SimpleGrid>

    </Box>
  )
}

export default Home;
