import { Box, Flex, VStack, Text, Avatar, Link } from "@chakra-ui/react";
import SidebarLogo from "./../../SidebarLogo";
import useLogin from "./../../store/useLogin";
import SidebarItem from "./SidebarItem";
import { Link as ReactRouterLink } from "react-router-dom";

const Sidebar = () => {
  const userNow = useLogin((state) => state.user);
  return (
    <>
      {userNow && (
        <>
          <Box
            h="100vh"
            p="5"
            borderRight="1px"
            borderColor="gray.200"
            position="sticky"
            top="0"
            left="0"
          >
            <Flex gap="20" flexDir="column" w="full">
              <Box
                fontWeight="bold"
                mt="20px"
                textTransform="uppercase"
                fontSize={{ base: "1rem", md: "2rem" }}
              >
                Gabut Ah
              </Box>
              <VStack gap="5" alignItems="start">
                <SidebarItem />
                <Link
                  as={ReactRouterLink}
                  w="full"
                  style={{ textDecoration: "none" }}
                  to={`/${userNow?.displayName}`}
                >
                  <Flex
                    _hover={{ cursor: "pointer", bg: "gray.800" }}
                    p="3"
                    rounded="lg"
                    w="full"
                    alignItems="center"
                    gap="5"
                    justifyContent={{ base: "center", lg: "start" }}
                  >
                    <Avatar src={userNow.photoURL} size="md" />
                    <Text
                      fontWeight="bold"
                      display={{ base: "none", lg: "block" }}
                    >
                      {userNow.displayName}
                    </Text>
                  </Flex>
                </Link>
              </VStack>
            </Flex>
          </Box>
        </>
      )}
    </>
  );
};

export default Sidebar;
