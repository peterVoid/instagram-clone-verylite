import { Flex, Text, Avatar, Button, Box } from "@chakra-ui/react";
import DetailUser from "../../model.ts";
import useCheckFollowOrNot from "../../hooks/useCheckFollowOrNot.ts";
const SuggestUser = (D: DetailUser) => {
  const { follow, handleFollowAndUnfollow, setFollow } = useCheckFollowOrNot(
    D.uid
  );
  return (
    <Flex gap="4" alignItems={"center"} position="relative" cursor={"pointer"}>
      <Avatar src={D?.photoURL || ""} size="lg" />
      <Flex flexDir="column">
        <Text>{D.displayName}</Text>
        <Text color="gray.500">{D.bio}</Text>
      </Flex>
      <Button
        onClick={handleFollowAndUnfollow}
        position="absolute"
        right="100"
        cursor={"pointer"}
        _hover={{ color: "blue.500" }}
      >
        Follow
      </Button>
    </Flex>
  );
};

export default SuggestUser;
