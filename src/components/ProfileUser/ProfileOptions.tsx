import { Container, Flex, Box } from "@chakra-ui/react";
import { BsPostcardFill } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { FaUserTag } from "react-icons/fa";
const ProfileOptions = () => {
  return (
    <Container maxW="container.lg" borderTop="1px" borderColor="gray.100">
      <Flex w="full" justifyContent="center" gap="20" mb="70px">
        <Flex
          gap="2"
          cursor="pointer"
          borderTop="1px"
          borderColor="gray.100"
          py="12px">
          <BsPostcardFill style={{ width: "20px", height: "20px" }} />
          <Box textTransform="uppercase" fontWeight="bold" fontSize="1.1rem">
            Posts
          </Box>
        </Flex>
        <Flex gap="2" cursor="pointer" py="12px">
          <CiBookmark style={{ width: "20px", height: "20px" }} />
          <Box textTransform="uppercase">Saved</Box>
        </Flex>
        <Flex gap="2" cursor="pointer" py="12px">
          <FaUserTag style={{ width: "20px", height: "20px" }} />
          <Box textTransform="uppercase">Tagged</Box>
        </Flex>
      </Flex>
    </Container>
  );
};

export default ProfileOptions;
