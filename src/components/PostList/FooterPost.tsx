import {
  Box,
  VStack,
  Flex,
  Text,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { Postingan } from "../../modelPost";
import { useRef, useState } from "react";
import useAddComments from "../../hooks/useAddComments";
import ModalViewAllComments from "../../Modal/ModalViewAllComments";

interface Props {
  item: Postingan;
}
const FooterPost = ({ item }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comments, setComments] = useState<string>("");
  const { handleComments, isLoading } = useAddComments(
    item.id as string,
    comments
  );
  const handleCmnt = async () => {
    try {
      await handleComments();
      setComments("");
    } catch (error) {
      console.log(error);
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <VStack w="full" alignItems={"start"} py="1" px="2">
        <Flex gap="3" alignItems="center">
          <Box fontWeight="semibold" fontSize="1.1rem">
            {item.createdBy}
          </Box>
          <Text fontSize="1.1rem">{item.isCaption}</Text>
        </Flex>

        <Text
          fontSize="1.1rem"
          color="gray.500"
          fontWeight="semibold"
          cursor={"pointer"}
          onClick={onOpen}
        >
          view all comments
        </Text>

        <Flex gap="3" alignItems="center">
          <Box fontWeight="semibold" fontSize="1.1rem">
            {item.comments[0]?.displayName}
          </Box>
          <Text fontSize="1.1rem">{item.comments[0]?.comment}</Text>
        </Flex>
        <Flex w="full">
          <input
            type="text"
            placeholder="Add a comment..."
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: "1.1rem",
              fontWeight: "semibold",
              cursor: "pointer",
              borderBottom: "1px solid gray",
              backgroundColor: "transparent",
              marginBottom: "10px",
              paddingBottom: "20px",
              paddingTop: "5px",
            }}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            ref={inputRef}
          />
          <Button onClick={handleCmnt} isLoading={isLoading}>
            Send
          </Button>
        </Flex>
      </VStack>
      {onOpen && <ModalViewAllComments isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default FooterPost;
