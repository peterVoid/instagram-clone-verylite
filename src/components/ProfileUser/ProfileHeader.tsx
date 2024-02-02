import {
  Flex,
  Avatar,
  Container,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import useLogin from "./../../store/useLogin";
import useProfileUser from "./../../store/useProfileUser";
import { useState, useRef } from "react";
import useCheckFollowOrNot from "./../../hooks/useCheckFollowOrNot";
import ModalEditProfile from "./../../Modal/ModalEditProfile";
const ProfileHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const profileUser = useProfileUser((state) => state.profileUser);
  const userNow = useLogin((state) => state.user);
  const checkFollowOrEditProfile = profileUser.uid !== userNow.uid;
  const { follow, handleFollowAndUnfollow, setFollow } = useCheckFollowOrNot(profileUser.uid);
  return (
    <>
      <Container maxW="container.lg" py="80px" mb="100px">
        <Flex alignItems="center" gap="80px">
          <Avatar src={profileUser.photoURL} size="2xl" />
          <Flex flexDir="column" gap="5">
            <Flex gap="5" alignItems="center">
              <Box fontWeight="semibold" fontSize="1.5rem">
                {profileUser.displayName}
              </Box>
              <Box>
                {checkFollowOrEditProfile && (
                  <Button
                    onClick={ handleFollowAndUnfollow}
                    colorScheme={"blue"}>
                    {follow ? "Unfollow" : "Follow"}
                  </Button>
                )}
                {!checkFollowOrEditProfile && (
                  <Button onClick={onOpen} ref={btnRef}>
                    Edit Profile
                  </Button>
                )}
              </Box>
            </Flex>
            <Flex gap="12">
              <Box>
                <Box fontWeight="bold" as="span" mr="3px">
                  {profileUser.posts.length}
                </Box>{" "}
                Posts
              </Box>
              <Box>
                <Box fontWeight="bold" as="span" mr="3px">
                  {profileUser.followers.length}
                </Box>{" "}
                Followers
              </Box>
              <Box>
                <Box fontWeight="bold" as="span" mr="3px">
                  {profileUser.following.length}
                </Box>{" "}
                Following
              </Box>
            </Flex>

            <Box fontWeight="semibold">
              {profileUser.bio ? profileUser.bio : "No bio"}
            </Box>
          </Flex>
        </Flex>
      </Container>

      {onOpen && (
        <ModalEditProfile isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      )}
    </>
  );
};

export default ProfileHeader;
