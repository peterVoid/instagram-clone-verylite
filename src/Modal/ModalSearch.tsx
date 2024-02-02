import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Flex,
  Avatar,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useSearchUser from "../hooks/useSearchUser";
import { Link as ReactRouterLink } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ModalSearch = ({ isOpen, onClose }: Props) => {
  const [value, setValue] = useState<string>("");
  const { isLoading, getUser, handleSearchUser, nothing } = useSearchUser();
  const handleUser = async () => {
    try {
      await handleSearchUser(value);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="black" color="white">
        <ModalHeader>Search Users</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup size="md" mt="10px">
            <Input
              pr="4.5rem"
              type="text"
              placeholder="Search User by username"
              size="md"
              outline="none"
              onChange={(e) => setValue(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={handleUser}
                isLoading={isLoading}>
                <IoSearchSharp />
              </Button>
            </InputRightElement>
          </InputGroup>
          {getUser && (
            <Link
              as={ReactRouterLink}
              to={`/${getUser.displayName}`}
              w="full"
              style={{ textDecoration: "none" }}>
              <Flex
                w="full"
                alignItems={"center"}
                gap={"10px"}
                mt="20px"
                p="10px"
                _hover={{ cursor: "pointer", bg: "gray.800" }}
                rounded="lg"
                cursor="pointer">
                <Avatar src={getUser.photoURL} size="md" />
                <Text>{getUser.displayName}</Text>
              </Flex>
            </Link>
          )}
          {nothing && (
            <Flex
              w="full"
              alignItems={"center"}
              gap={"10px"}
              mt="20px"
              p="10px"
              _hover={{ cursor: "pointer", bg: "gray.800" }}
              rounded="lg"
              cursor="pointer">
              <Text>Not Found</Text>
            </Flex>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalSearch;
