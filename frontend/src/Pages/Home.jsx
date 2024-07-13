import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Flex, Heading, Image, Input, Text } from "@chakra-ui/react";
import { CountryCard } from "../components/CountryCard";
import { DataContext } from "../context/DataContext";

const Home = () => {
  const [searchData, setSearchData] = useState("");

  const { dataList, setDataList, historyList, setHistoryList } =
    useContext(DataContext);

  const searchInputBox = useRef(null);

  useEffect(() => {
    searchInputBox.current.focus();
  }, []);

  const handleChange = (e) => {
    setSearchData(e.target.value);
  };

  const fetchCountryData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Currency not found");
      }
      const data = await response.json();
      setDataList(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    let id = null;
    if (searchData !== "") {
      id = setTimeout(() => {
        const newHistory = [...historyList];

        if (newHistory.length >= 5) {
          newHistory.pop();
        }
        newHistory.unshift(searchData);

        setHistoryList(newHistory);
        fetchCountryData(`https://restcountries.com/v3.1/currency/${searchData}`);
      }, 600);
    }
    return () => clearInterval(id);
  }, [searchData]);

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        mt={"80px"}
      >
        <Box w={{ base: "90%", md: "50%" }}>
          <Input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            ref={searchInputBox}
            value={searchData}
            onChange={handleChange}
          />
        </Box>
      </Box>

      {dataList.length === 0 ? (
        <Flex
          align={"center"}
          direction={"column"}
          justifyContent={"center"}
          mt={"20px"}
        >
          <Box
            border="2px solid #3182CE"  
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
          >
            <Image
              src="https://thumbs.dreamstime.com/b/virtual-search-bar-text-welcome-businessman-pushing-his-right-hand-index-finger-to-touch-icon-231534102.jpg"
              alt=""
              height={"400px"}
            />
          </Box>
        </Flex>
      ) : (
        <Flex wrap={"wrap"} gap={"20px"} mt={"20px"} p={{ base: "10px", md: "50px" }}>
          {dataList.map((item, index) => (
            <CountryCard key={index} item={item} />
          ))}
        </Flex>
      )}
    </>
  );
};

export { Home };
