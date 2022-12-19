import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Button, Heading, Image, HStack, Center, SimpleGrid, Container } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Detail() {
  const [yugiDetail, setYugiDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/')
  }

  useEffect(() => {
    const loadDetail = async () => {
      setLoading(true)
      try {
        const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`;
        const response = await fetch(url);
        const data = await response.json();
        setYugiDetail(data.data);// perhatikan hasil dari fetch 
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    loadDetail();
  }, [id]);

  if (loading) return <h1>Loading...</h1>
  return (
    <>
      {yugiDetail.map((detail, index) => (
        <Box key={index}>
          <Button onClick={() => navigateHome()} m={5}>{"< Back"}</Button>
          <Center>
            <HStack>
              {detail.card_images.map((imgCard, index) => (
                <Image key={index} src={imgCard.image_url} w={200} />
              ))}
              <Box>
                <Heading as="h2">{detail.name}</Heading>
                <Text>Level: {detail.level}</Text>
                <Text>{detail.attribute}</Text>
                <Text>ATK/{detail.atk} DEF/{detail.def}</Text>
                <Text>[ {detail.type} / {detail.race} ]</Text>
                <Text>{detail.description}</Text>
              </Box>
            </HStack>
          </Center>
          <SimpleGrid
            columns="4"
            spacing="8"
            p="10"
            // textAlign="center"
            rounded="lg"
            color="gray.400">
            {
              detail.card_sets.map((set, index) => (
                <div key={index}>
                  <Container boxShadow="xs" p="6" rounded="md" bg="#F8F8F8" color="#5E3F2E">
                    <Text>Name: {set.set_name}</Text>
                    <Text>Code: {set.set_code}</Text>
                    <Text>Rarity: {set.set_rarity}</Text>
                    <Text>Price: {set.set_price}</Text>
                  </Container>
                </div>
              ))}
          </SimpleGrid>
        </Box>
      ))
      }

    </>
  ) // TODO: replace this
}

export default Detail;
