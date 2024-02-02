import { Flex, Box } from "@chakra-ui/react";
import { GiSelfLove } from "react-icons/gi";
import { useState } from "react";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { Postingan } from "../../modelPost";
import useLikePost from "../../hooks/useLikePost";

interface Props {
  item: Postingan;
}

const PhotoPost = ({ item }: Props) => {
  const [like, setLike] = useState<number>(2012);
  const { likes, handleLikePost } = useLikePost(item.id);
  return (
    <Flex w="700px" px="2" py="2" flexDir="column">
      <Box>
        <img src={item.imageURL} style={{ width: "100%" }} />
      </Box>
      <Flex my="20px" gap="23px" alignItems="center" cursor={"pointer"}>
        {likes ? (
          <Box>
            <FcLike
              style={{ width: "35px", height: "35px" }}
              onClick={handleLikePost}
            />
          </Box>
        ) : (
          <Box>
            <GiSelfLove
              style={{ width: "35px", height: "35px" }}
              onClick={handleLikePost}
            />
          </Box>
        )}
      </Flex>
      <Box fontWeight="bold" fontSize="1.2rem">
        {item.likes.length} likes
      </Box>
    </Flex>
  );
};

export default PhotoPost;
