import { Container, Box, Flex, Spinner } from "@chakra-ui/react";
import Sidebar from "./../components/sidebar/Sidebar";
import PostList from "./../components/PostList/PostList";
import SuggestedUser from "./../components/SuggestUser/SuggestedUser";
import useLogin from "../store/useLogin";
const HomePage = () => {
  const userNow = useLogin((state) => state.user);
  if (!userNow) {
    return (
      <Flex w="full" h="100vh" justifyContent={"center"} alignItems={"center"}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }
  return (
    <Box w="full" bg="black" color="white">
      <Container maxW="container.xxl">
        <Flex w="full" alignItems="start" justifyContent="start">
          <Box flex=".7">
            <Sidebar />
          </Box>
          <Box flex="2">
            <PostList />
          </Box>
          <Box flex="1" display={{ base: "none", xl: "block" }}>
            <SuggestedUser />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default HomePage;
