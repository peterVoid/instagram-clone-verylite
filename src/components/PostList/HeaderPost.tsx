import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import { Postingan } from "../../modelPost";

interface Props {
  item: Postingan;
}
const HeaderPost = ({ item: Post }: Props) => {
  console.log(Post);
  return (
    <Box w="700px" px="2" py="2">
      <Flex alignItems="center" gap="3">
        <Avatar src={Post.photoCreated} size="md" />
        <Text>{Post.createdBy}</Text>
      </Flex>
    </Box>
  );
};

export default HeaderPost;
