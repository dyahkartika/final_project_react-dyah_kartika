import React from "react";
import { Box, Heading, Image, SimpleGrid, Text, Center } from "@chakra-ui/react";

function Card({ card }) {
  console.log(card);
  return (
    <SimpleGrid  bg="#F8CFB1" column={4} display={"flex"} justifyContent={"center"} style={{ flexWrap: "wrap" }}>
      {card.map((dataCard, index) => (
        <a key={index} href={`/card/${dataCard.id}`}>
          <Box className="yugioh-card" rounded='xl' shadow='lg' bg='white' my={10} mx={5} w={300} h={600}>
            <Center>
            {dataCard.card_images.map((item, index) => (
              <Image m={2} key={index} w={"340px"} src={item.image_url} alt="" />
            ))}
            </Center>
            <Box>
              <Box px={6} py={4} borderRadius={10} mx={2}>
                <Heading as="h2" fontSize={"lg"} fontWeight={"bold"} textAlign={"center"}>
                  {dataCard.name}
                </Heading>
                <Box pt={3}>
                <Text fontSize={"sm"} color="gray.800">{dataCard.type} / {dataCard.race}</Text>
                <Text fontSize={"sm"}>ATK: {dataCard.atk} DEF: {dataCard.def}</Text>
                <Text fontSize={"sm"}>Level: {dataCard.level}</Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </a>
      ))}
    </SimpleGrid>
  )
}

export default Card;
