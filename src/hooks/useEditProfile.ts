import useLogin from "./../store/useLogin";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, strg } from "./../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import useProfileUser from "./../store/useProfileUser";

interface Props {
  selectedImage: string;
  dataUser: any;
}

const useEditProfile = () => {
  const [isUpdated, setIsUpdated] = useState(false);
  const setUserInStore = useLogin((state) => state.setUser);
  const userNow = useLogin((state) => state.user);
  const setSelecTarget = useProfileUser((state) => state.setProfileUser);
  const handleEditProfile = async ({ selectedImage, dataUser }: Props) => {
    setIsUpdated(true);
    const docNow = doc(db, "users", userNow.uid);
    const storageRef = ref(strg, `profilePic/${userNow.uid}`);
    try {
      let URL;
      if (selectedImage) {
        uploadString(storageRef, selectedImage, "data_url");
        URL = await getDownloadURL(storageRef);
      }
      const newDoc = {
        ...userNow,
        displayName: dataUser.username || userNow.displayName,
        bio: dataUser.bio || userNow.bio,
        photoURL: URL || userNow.photoURL,
      };
      await updateDoc(docNow, newDoc);
      setSelecTarget(newDoc);
      setUserInStore(newDoc);
      localStorage.setItem("user", JSON.stringify(newDoc));
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdated(false);
    }
  };
  return {
    handleEditProfile,
    isUpdated,
  };
};

export default useEditProfile;
