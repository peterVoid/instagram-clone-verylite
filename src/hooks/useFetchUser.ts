import useProfileUser from "./../store/useProfileUser";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useFetchUser = ({ name }: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userFetch = useProfileUser((state) => state.setProfileUser);
  const user = useProfileUser((state) => state.profileUser);
  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("displayName", "==", name)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) return userFetch(null);
        let arr;
        querySnapshot.forEach((doc) => {
          arr = doc.data();
        });
        userFetch(arr);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [name]);

  return { isLoading, user };
};

export default useFetchUser;
