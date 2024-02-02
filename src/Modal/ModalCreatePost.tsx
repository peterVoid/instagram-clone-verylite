import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  Input,
  Image,
} from "@chakra-ui/react";
import { FaRegFileImage } from "react-icons/fa";
import { useRef, useState } from "react";
import useChangeImage from "../hooks/useChangeImage";
import useCreatePost from "../hooks/useCreatePost";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreatePost = ({ isOpen, onClose }: Props) => {
  const inputRef = useRef<HTMLInputElement>();
  const { selectedImage, handleChangeImage, setSelectedImage } =
    useChangeImage();
  const [valueInput, setValueInput] = useState<string>("");
  const { isLoading, createPost } = useCreatePost();
  const handleOnPost = async () => {
    try {
      await createPost(valueInput, selectedImage);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg="black" color="white">
        <ModalHeader>Create Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            placeholder="Type a Caption"
            onChange={(e) => setValueInput(e.target.value)}
          />
          <Input
            type="file"
            ref={inputRef}
            hidden
            onChange={handleChangeImage}
          />
          <Button
            onClick={() => inputRef.current?.click()}
            bg="black"
            _hover={{ bg: "gray.800" }}
          >
            <FaRegFileImage
              style={{ width: "20px", height: "20px", color: "white" }}
            />
          </Button>
          <Image
            boxSize="200px"
            src={selectedImage || undefined}
            objectFit="cover"
            mt="10px"
          />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleOnPost}
            isLoading={isLoading}
          >
            Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCreatePost;
