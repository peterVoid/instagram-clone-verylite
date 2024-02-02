import { Avatar, Flex, Text, Box, Button } from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout";
import SuggestUser from "./SuggestUser";
import useLogin from "./../../store/useLogin";
import useSuggestedUser from "../../hooks/useSuggestedUser";

const SuggestedUser = () => {
  const userNow = useLogin((state) => state.user);
  const { handleLogout, loading } = useLogout();
  const suggestedUser = useSuggestedUser();
  return (
    <>
      <Flex flexDir="column" gap="5" mt="70px" pr="20px">
        <Flex gap="4" alignItems={"center"} position="relative">
          <Avatar src={userNow.photoURL} size="lg" />
          <Flex flexDir="column">
            <Text>{userNow.displayName}</Text>
          </Flex>
          <Box position="absolute" right="100">
            <Button
              colorScheme="red"
              size="md"
              isLoading={loading}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Flex>

        <Box fontWeight="semibold" fontSize="1.2rem" color="gray.300">
          Suggested User
        </Box>

        {suggestedUser.length === 0 && (
          <Box color="gray.300" fontSize="1.2rem" fontWeight="semibold">
            Loading...
          </Box>
        )}

        {suggestedUser.length > 0 &&
          suggestedUser.map((item) => <SuggestUser key={item.uid} {...item} />)}
      </Flex>

      <Box color="gray.300" fontSize="1.2rem" fontWeight="semibold" mt="100px">
        @peter2024
      </Box>
    </>
  );
};

export default SuggestedUser;
