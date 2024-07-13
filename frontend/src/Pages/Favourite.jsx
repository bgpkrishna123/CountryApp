import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { CountryCard } from "../components/CountryCard";
import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";

const Favourite = () => {
  const { favoriteList } = useContext(DataContext);

  return (
    <Box mt="80px" textAlign="center" color={useColorModeValue("gray.800", "white")}>
      <Heading fontSize="3xl" mb="20px">
        Favorites
      </Heading>
      <Flex
        wrap="wrap"
        gap="20px"
        mt="20px"
        p={{ base: "10px", md: "50px" }}
        justifyContent="center"
      >
        {favoriteList.map((item, index) => {
          return <CountryCard key={index} item={item} />;
        })}
      </Flex>
    </Box>
  );
};

export { Favourite };
