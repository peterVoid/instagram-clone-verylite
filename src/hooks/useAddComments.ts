import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import useLogin from "../store/useLogin";
import useCreatePosts from "../store/useCreatePosts";
import { useState } from "react";
const useAddComments = (id: string, comment: string) => {
  const userRef = doc(db, "posts", id);
  const userNow = useLogin((state) => state.user);
  const setCreatePost = useCreatePosts((state) => state.setPosts);
  const postss = useCreatePosts((state) => state.posts);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleComments = async () => {
    setIsLoading(true);
    try {
      await updateDoc(userRef, {
        comments: arrayUnion({ ...userNow, comment }),
      });
      setCreatePost(
        postss.map((e) => {
          if (e.id === id) {
            return {
              ...e,
              comments: [...e.comments, { ...userNow, comment }],
            };
          } else {
            return e;
          }
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    handleComments,
    isLoading,
  };
};

export default useAddComments;
