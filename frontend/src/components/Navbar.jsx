import React, { useContext } from "react";
import {
  Box,
  Flex,
  Button,
  useToast,
  useDisclosure,
  HStack,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { BASE_URL } from "../util/vars";

const Navbar = () => {
  const Links = [
    { name: "Home", path: "/" },
    { name: "Favourite", path: "/favorite" },
    { name: "History", path: "/history" },
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast({
    position: "bottom",
    duration: 4000,
    isClosable: true,
  });
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      const result = await response.json();
      setAuth({
        isAuth: false,
        username: "",
        accessToken: "",
      });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      toast({
        title: `${result.message}`,
        status: "success",
        duration: 4000,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: `${error.message}`,
        status: "error",
        duration: 4000,
      });
    }
  };

  return (
    <>
      <Box
        bg="black"
        px={{ base: 4, md: 16 }}
        borderBottom="1px solid gray"
        position="fixed"
        top={0}
        w="100%"
        zIndex={4}
      >
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Box
            fontSize="2xl"
            fontWeight="bold"
            onClick={() => navigate("/")}
            color=  "#FF6B6B" 
            _hover={{
              cursor: "pointer",
              color: "#FF6B6B" ,
            }}
          >
            CountryApp
          </Box>
          <HStack
            as="nav"
            spacing={8}
            display={{ base: "none", md: "flex" }}
            fontWeight="medium"
          >
            {Links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                style={({ isActive }) => ({
                  color: location.pathname === link.path ? "#FF6B6B" : "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "lg",
                })}
              >
                {link.name}
              </NavLink>
            ))}
          </HStack>
          <Flex gap={{ base: "10px", md: "20px" }}>
            {auth.isAuth ? (
              <Button
                bg="#FF6B6B"
                _hover={{ bg: "#FF8F8F" }}
                color="#FFFFFF"
                size="md"
                fontSize="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  bg="#FF6B6B"
                  _hover={{ bg: "#FF8F8F" }}
                  color="#FFFFFF"
                  size="md"
                  fontSize="sm"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  bg="#FF6B6B"
                  _hover={{ bg: "#FF8F8F" }}
                  color="#FFFFFF"
                  size="md"
                  fontSize="sm"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </>
            )}
          </Flex>
        </Flex>
        {isOpen && (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as="nav" spacing={4}>
              {Links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  style={({ isActive }) => ({
                    color: location.pathname === link.path ? "#FF6B6B" : "#FFFFFF",
                    textDecoration: "none",
                    fontSize: "lg",
                  })}
                >
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
};

export { Navbar };
