import { Flex, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import ModalSearch from "./../../Modal/ModalSearch";
const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip label="Search" fontSize="md" hasArrow placement="right-end">
        <Flex
          alignItems="center"
          w="full"
          gap="20px"
          _hover={{ cursor: "pointer", bg: "gray.800" }}
          p="3"
          rounded="lg"
          justifyContent={{ base: "center", lg: "start" }}
          onClick={onOpen}>
          <IoIosSearch style={{ width: "35px", height: "35px" }} />
          <Text display={{ base: "none", md: "block" }}>Search</Text>
        </Flex>
      </Tooltip>

      {onOpen && <ModalSearch isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default Search;
