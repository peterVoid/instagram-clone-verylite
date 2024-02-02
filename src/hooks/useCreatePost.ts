import { useState } from "react";
import { Postingan } from "../modelPost";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db, strg } from "../firebase/firebase";
import useLogin from "../store/useLogin";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import useCreatePosts from "../store/useCreatePosts";

const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userNow = useLogin((state) => state.user);
  const setTheUser = useLogin((state) => state.setUser);
  const createPostInStote = useCreatePosts((state) => state.createPost);
  const createPost = async (
    caption: string | null,
    selectedFile: string | null
  ) => {
    setIsLoading(true);
    try {
      const valueDoc: Postingan = {
        comments: [],
        createdAt: new Date().getTime(),
        createdBy: userNow.displayName,
        imageURL: selectedFile,
        likes: [],
        photoCreated: userNow.photoURL,
        isCaption: caption,
        isTrue: true,
      };
      const newDoc = await addDoc(collection(db, "posts"), {
        ...valueDoc,
      });
      let URL;
      const storageRef = ref(strg, `posts/${newDoc.id}`);
      const uploadTask = uploadString(
        storageRef,
        selectedFile as string,
        "data_url"
      );
      await uploadTask;
      URL = await getDownloadURL(storageRef);
      valueDoc.imageURL = URL;
      valueDoc.id = newDoc.id;
      await updateDoc(doc(db, "posts", newDoc.id), {
        imageURL: URL,
      });
      await updateDoc(doc(db, "users", userNow.uid), {
        posts: arrayUnion(newDoc.id),
      });
      setTheUser({ ...userNow, posts: [...userNow.posts, newDoc.id] });
      createPostInStote(valueDoc);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...userNow, posts: [...userNow.posts, newDoc.id] })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, createPost };
};

export default useCreatePost;
