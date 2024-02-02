import { useEffect, useState } from "react";
import { Postingan } from "../modelPost";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import useProfileUser from "../store/useProfileUser";
import useCreatePosts from "../store/useCreatePosts";
const useFetchPostWithUid = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [post, setPost] = useState<Postingan[]>([]);
  const targetUser = useProfileUser((state) => state.profileUser);
  const setThePost = useCreatePosts((state) => state.setPosts);
  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(db, "posts"),
          where("createdBy", "==", targetUser.displayName)
        );
        const querySnapShot = await getDocs(q);
        let arr: Postingan[] = [];
        querySnapShot.forEach((doc) => {
          arr.push({ id: doc.id, ...(doc.data() as Postingan) });
        });
        setThePost(arr);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [targetUser.uid]);
  return {
    isLoading,
    post,
  };
};

export default useFetchPostWithUid;
