import { Link as ReactRouterLink } from "react-router-dom";
import { Flex, Text, Link, Tooltip } from "@chakra-ui/react";
import { IoIosHome } from "react-icons/io";
const Home = () => {
  return (
    <Tooltip label="Home" fontSize="md" hasArrow placement="right-end">
      <Link
        as={ReactRouterLink}
        to="/"
        w="full"
        style={{ textDecoration: "none" }}>
        <Flex
          alignItems="center"
          w="full"
          gap="20px"
          _hover={{ cursor: "pointer", bg: "gray.800" }}
          p="3"
          rounded="lg"
          justifyContent={{ base: "center", lg: "start" }}>
          <IoIosHome style={{ width: "35px", height: "35px" }} />
          <Text display={{ base: "none", md: "block" }}>Home</Text>
        </Flex>
      </Link>
    </Tooltip>
  );
};

export default Home;
