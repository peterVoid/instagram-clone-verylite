import { useEffect, useState } from "react";
import useLogin from "../store/useLogin";
import useCreatePosts from "../store/useCreatePosts";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/firebase";
const useLikePost = (id: string) => {
  const [likes, setLikes] = useState(false);
  const userNow = useLogin((state) => state.user);
  const postNow = useCreatePosts((state) => state.posts);
  const setPosts = useCreatePosts((state) => state.setPosts);

  useEffect(() => {
    const checkUserAlreadyLikeOrNot = postNow.filter((ida) => ida.id === id);
    checkUserAlreadyLikeOrNot[0].likes.map((like) => {
      if (like === userNow.uid) {
        setLikes(true);
      } else {
        setLikes(false);
      }
    });
  }, [postNow]);

  const handleLikePost = async () => {
    const washingtonRef = doc(db, "posts", id);
    try {
      await updateDoc(washingtonRef, {
        likes: likes ? arrayRemove(userNow.uid) : arrayUnion(userNow.uid),
      });
      if (likes) {
        setPosts(
          postNow.map((e) =>
            e.id !== id
              ? e
              : { ...e, likes: e.likes.filter((e) => e !== userNow.uid) }
          )
        );
        setLikes(false);
      } else {
        setPosts(
          postNow.map((e) =>
            e.id !== id ? e : { ...e, likes: [...e.likes, userNow.uid] }
          )
        );
        setLikes(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { likes, handleLikePost };
};

export default useLikePost;
