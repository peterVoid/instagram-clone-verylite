import { Grid, Center, Spinner, Text } from "@chakra-ui/react";
import ProfilePosts from "./ProfilePosts";
import useFetchPostWithUid from "../../hooks/useFetchPostWithUid";
import useCreatePost from "../../store/useCreatePosts";

const ProfilePost = () => {
  const { isLoading } = useFetchPostWithUid();
  const a = useCreatePost((state) => state.posts);

  if (isLoading)
    return (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
        />
      </Center>
    );
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap="1"
      columnGap="1"
    >
      {a.length === 0 && <Text>No Post</Text>}
      {a && a.map((item) => <ProfilePosts key={item.createdAt} post={item} />)}
    </Grid>
  );
};

export default ProfilePost;
