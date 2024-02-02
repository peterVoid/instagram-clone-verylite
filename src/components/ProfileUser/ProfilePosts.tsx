import {
  Avatar,
  Box,
  Divider,
  Flex,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  Button,
  useDisclosure,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import useProfileUser from "../../store/useProfileUser";
import { MdDelete } from "react-icons/md";
import useLogin from "../../store/useLogin";
import useDeletePost from "../../hooks/useDeletePost";
import { useState } from "react";
import { FcLike } from "react-icons/fc";
import { GiSelfLove } from "react-icons/gi";
import { FaRegComment } from "react-icons/fa";
import useLikePost from "../../hooks/useLikePost";
import useAddComments from "../../hooks/useAddComments";
import { IoIosSend } from "react-icons/io";

const ProfilePosts = ({ post }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const profileTarget = useProfileUser((state) => state.profileUser);
  const userNow = useLogin((state) => state.user);
  const deletePost = userNow.uid === profileTarget.uid;
  const { loading, handleDeletePost } = useDeletePost();
  const { likes, handleLikePost } = useLikePost(post.id);
  const [input, setInput] = useState<string>("");
  const { handleComments, isLoading } = useAddComments(post.id, input);
  const hndl = async () => {
    try {
      await handleComments();
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <GridItem
        aspectRatio="1/1"
        overflow={"hidden"}
        rounded={"md"}
        border={"1px solid"}
        borderColor={"gray.200"}
        cursor={"pointer"}
        position={"relative"}
        onClick={onOpen}
      >
        <Box w="380px">
          <Image src={post.imageURL} objectFit="cover" />
        </Box>
      </GridItem>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton mr={{ sm: "80px", lg: "auto" }} mt={"10px"} />
          <ModalBody bg="black">
            <Flex
              alignItems={"flex-start"}
              gap={5}
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
              maxH={"90vh"}
              minH={"50vh"}
            >
              <Flex
                flex={1.5}
                borderRadius={"md"}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  src={post.imageURL}
                  w="full"
                  objectFit={"cover"}
                  h="full"
                />
              </Flex>
              <Flex
                flex={1}
                display={{ base: "none", md: "flex" }}
                direction={"column"}
                position={"relative"}
                minH={"66.3vh"}
              >
                <Flex justifyContent={"space-between"} alignItems="center">
                  <Flex alignItems={"center"} gap={2}>
                    <Avatar src={profileTarget.photoURL} size={"md"} />
                    <Text
                      fontWeight={"bold"}
                      fontSize={"1rem"}
                      color={"white"}
                      ml="10px"
                    >
                      {profileTarget.displayName}
                    </Text>
                  </Flex>

                  {deletePost && (
                    <>
                      <Button
                        size={"sm"}
                        bg={"transparent"}
                        _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                        borderRadius={4}
                        p={1}
                        mr={10}
                        onClick={() => handleDeletePost(post.id)}
                        isLoading={loading}
                      >
                        <MdDelete size={20} cursor={"pointer"} />
                      </Button>
                    </>
                  )}
                </Flex>
                <Divider orientation="horizontal" my={4} bg={"gray.500"} />

                <VStack
                  w="full"
                  alignItems={"flex-start"}
                  overflowY={"auto"}
                  maxH="350px"
                >
                  <Flex gap={2} w="full" alignItems={"center"}>
                    <Avatar src={profileTarget.photoURL} />
                    <Text
                      color={"white"}
                      fontWeight={"bold"}
                      fontSize={"1rem"}
                      ml={"10px"}
                    >
                      {profileTarget.displayName}
                    </Text>
                    <Text color={"gray.500"} fontSize={"1rem"}>
                      {post.isCaption}
                    </Text>
                  </Flex>
                  {post.comments.length === 0 && (
                    <Text
                      color={"gray.500"}
                      fontSize={"1rem"}
                      fontWeight={"bold"}
                    >
                      {" "}
                      No Comment
                    </Text>
                  )}
                  {post.comments.map((comment: any) => {
                    return (
                      <Flex gap={2} w="full" alignItems={"center"}>
                        <Avatar src={comment.photoURL} />
                        <Text
                          color={"white"}
                          fontWeight={"bold"}
                          fontSize={"1rem"}
                          ml={"10px"}
                        >
                          {comment.displayName}
                        </Text>
                        <Text color={"gray.500"} fontSize={"1rem"}>
                          {comment.comment}
                        </Text>
                      </Flex>
                    );
                  })}
                </VStack>
                <Box
                  position={"absolute"}
                  bottom={0}
                  borderTop={"1px solid"}
                  w="full"
                  borderColor={"gray.500"}
                  p={3}
                  bg="blackAlpha.300"
                >
                  <Flex
                    my="20px"
                    gap="23px"
                    alignItems="center"
                    cursor={"pointer"}
                  >
                    <Box>
                      {likes ? (
                        <FcLike
                          style={{ width: "35px", height: "35px" }}
                          onClick={() => handleLikePost()}
                        />
                      ) : (
                        <GiSelfLove
                          style={{ width: "35px", height: "35px" }}
                          onClick={() => handleLikePost()}
                        />
                      )}
                    </Box>
                  </Flex>
                  <Box
                    fontWeight="bold"
                    fontSize="1.2rem"
                    cursor={"pointer"}
                    color={"gray.500"}
                  >
                    {post.likes.length} likes
                  </Box>
                  <InputGroup>
                    <Input
                      w="full"
                      border="none"
                      focusBorderColor="none"
                      placeholder="Add a comment..."
                      color={"white"}
                      borderBottom={"1px solid"}
                      borderColor={"gray.500"}
                      onChange={(e) => setInput(e.target.value)}
                      value={input}
                    />
                    <InputRightElement>
                      <IoIosSend
                        size={20}
                        onClick={hndl}
                        cursor={"pointer"}
                        color={"white"}
                        style={{ marginRight: "10px" }}
                      />
                    </InputRightElement>
                  </InputGroup>
                </Box>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePosts;
