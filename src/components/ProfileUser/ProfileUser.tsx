import { Container, Box, Flex, Spinner, Center } from "@chakra-ui/react";
import Sidebar from "./../sidebar/Sidebar";
import ProfileHeader from "./ProfileHeader";
import ProfileOptions from "./ProfileOptions";
import { useParams } from "react-router-dom";
import useFetchUser from "./../../hooks/useFetchUser";
import useProfileUser from "./../../store/useProfileUser";
import ProfilePost from "./ProfilePost";

const ProfileUser = () => {
  const { username } = useParams();
  const fetchUser = useProfileUser((state) => state.profileUser);
  const { isLoading, user } = useFetchUser({ name: username });

  if (!fetchUser && !isLoading) {
    return (
      <Center
        h="100vh"
        bg="black"
        color="white"
        fontWeight="bold"
        fontSize="1.5rem">
        USERS NOT FOUND
      </Center>
    );
  }

  return (
    <>
      {!isLoading && user ? (
        <Box w="full" bg="black" color="white">
          <Container maxW="container.xxl">
            <Flex w="full" alignItems="start" justifyContent="start">
              <Box flex="1">
                <Sidebar />
              </Box>
              <Flex flex="4.4" flexDir="column" alignItems="center">
                <ProfileHeader />
                <ProfileOptions />
                <ProfilePost />
              </Flex>
            </Flex>
          </Container>
        </Box>
      ) : (
        <Flex
          w="full"
          h="100vh"
          justifyContent={"center"}
          alignItems={"center"}
          bg="black">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      )}
    </>
  );
};

export default ProfileUser;
