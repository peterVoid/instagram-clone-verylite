import { Box, Flex, Spinner, VStack } from "@chakra-ui/react";
import HeaderPost from "./HeaderPost";
import PhotoPost from "./PhotoPost";
import FooterPost from "./FooterPost";
import useGetAllPosti from "../../hooks/useGetAllPosti";
import useCreatePosts from "../../store/useCreatePosts";
const PostList = () => {
  const { isLoading } = useGetAllPosti();
  const pst = useCreatePosts((state) => state.posts);
  if (isLoading) {
    return (
      <Flex h="100vh" justifyContent="center" alignItems="center">
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
    <Flex
      h="100vh"
      overflowY="auto"
      mt="100px"
      position="relative"
      justifyContent="center"
      alignItems="start"
    >
      <VStack>
        {pst.map((item) => (
          <>
            <HeaderPost key={item.id} item={item} />
            <PhotoPost key={item.id} item={item} />
            <FooterPost key={item.id} item={item} />
          </>
        ))}
      </VStack>
    </Flex>
  );
};

export default PostList;
