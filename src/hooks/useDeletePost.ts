import { useState } from "react";
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import useCreatePost from "../store/useCreatePosts";
import { db } from "../firebase/firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";
import useLogin from "../store/useLogin";
const useDeletePost = () => {
  const [loading, setLoading] = useState(false);
  const deletePostStorage = useCreatePost((state) => state.deletePost);
  const userNow = useLogin((state) => state.user);
  const handleDeletePost = async (id: string) => {
    const washingtonRef = doc(db, "users", userNow.uid);
    setLoading(true);
    const storage = getStorage();
    try {
      await deleteObject(ref(storage, `posts/${id}`));
      await deleteDoc(doc(db, "posts", id));
      await updateDoc(washingtonRef, {
        posts: arrayRemove(id),
      });
      deletePostStorage(id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, handleDeletePost };
};

export default useDeletePost;
