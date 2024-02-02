import useCreatePosts from "../store/useCreatePosts";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Postingan } from "../modelPost";
import { useEffect, useState } from "react";
const useGetAllPosti = () => {
  const getPostOnStore = useCreatePosts((state) => state.setPosts);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const getAllPosti = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, "posts"), where("isTrue", "==", true));
        const querySnapShot = await getDocs(q);

        let arr: Postingan[] = [];
        querySnapShot.forEach((doc) => {
          arr.push({ id: doc.id, ...(doc.data() as Postingan) });
        });
        getPostOnStore(arr);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllPosti();
  }, []);
  return { isLoading };
};

export default useGetAllPosti;
