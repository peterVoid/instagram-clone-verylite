import { Flex, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import { IoIosCreate } from "react-icons/io";
import ModalCreatePost from "../../Modal/ModalCreatePost";
const Create = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip label="Create" fontSize="md" hasArrow placement="right-end">
        <Flex
          alignItems="center"
          w="full"
          gap="20px"
          _hover={{ cursor: "pointer", bg: "gray.800" }}
          p="3"
          rounded="lg"
          justifyContent={{ base: "center", lg: "start" }}
          onClick={onOpen}>
          <IoIosCreate style={{ width: "35px", height: "35px" }} />
          <Text display={{ base: "none", md: "block" }}>Create</Text>
        </Flex>
      </Tooltip>
      {onOpen && <ModalCreatePost isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default Create;
