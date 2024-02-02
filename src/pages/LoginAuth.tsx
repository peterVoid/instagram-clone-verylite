import { Container, Box, Flex } from "@chakra-ui/react";
import GoogleLogin from "../components/Google/GoogleLogin";

const LoginAuth = () => {
  return (
    <Flex h={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Container maxW="container.sm" p="5">
        <Flex
          flexDir={"column"}
          bg="green.400"
          rounded="lg"
          alignItems={"center"}
          p="5"
          gap="5">
          <Box fontWeight={"bold"} fontSize={"2rem"}>
            Login
          </Box>
          <GoogleLogin />
        </Flex>
      </Container>
    </Flex>
  );
};

export default LoginAuth;
