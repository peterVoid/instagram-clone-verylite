import { useRef, useState } from "react";
import useLogin from "./../store/useLogin";
import useChangeImage from "./../hooks/useChangeImage";
import useEditProfile from "./../hooks/useEditProfile";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  VStack,
  Avatar,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  btnRef: any;
}

const ModalEditProfile = ({ isOpen, onClose, btnRef }: Props) => {
  const userNow = useLogin((state) => state.user);
  const inputRef = useRef<HTMLInputElement>(null);
  const { selectedImage, handleChangeImage, setSelectedImage } =
    useChangeImage();
  const [dataUser, setDataUser] = useState({
    username: userNow.displayName,
    bio: userNow.bio,
    photoURL: userNow.photoURL,
  });
  const { handleEditProfile, isUpdated } = useEditProfile();
  const handleEdit = async () => {
    try {
      await handleEditProfile({ selectedImage, dataUser });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      closeOnOverlayClick={false}>
      <DrawerOverlay />
      <DrawerContent bg="gray.800" color="white">
        <DrawerCloseButton />
        <DrawerHeader>Edit Profile</DrawerHeader>

        <DrawerBody>
          <VStack gap="5">
            <Avatar src={selectedImage || dataUser.photoURL} size={"xl"} />
            <Input
              type="file"
              hidden
              ref={inputRef}
              onChange={handleChangeImage}
            />
            <Button onClick={() => inputRef.current?.click()}>Upload</Button>
            <Input
              placeholder="Edit a username"
              value={dataUser.username}
              onChange={(e) =>
                setDataUser({ ...dataUser, username: e.target.value })
              }
            />
            <Input
              placeholder="Edit a Bio"
              value={dataUser.bio}
              onChange={(e) =>
                setDataUser({ ...dataUser, bio: e.target.value })
              }
            />
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button colorScheme="blue" onClick={handleEdit} isLoading={isUpdated}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ModalEditProfile;
