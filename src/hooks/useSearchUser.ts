import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import useLogin from "../store/useLogin";

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [getUser, setUser] = useState<any>(null);
  const [nothing, setNothing] = useState<boolean>(false);
  const userNow = useLogin((state) => state.user);
  const handleSearchUser = async (value: string) => {
    setIsLoading(true);
    setUser(null);
    setNothing(false);

    try {
      if (!value) {
        alert("Please enter a username");
        return;
      }
      const q = query(
        collection(db, "users"),
        where("displayName", "==", value)
      );
      const querySnapShot = await getDocs(q);
      if (querySnapShot.empty) return setNothing(true);
      if (querySnapShot.docs[0].data().displayName === userNow.displayName) {
        return setUser(null);
      }
      querySnapShot.forEach((doc) => {
        setUser(doc.data());
      });
      setNothing(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, getUser, handleSearchUser, nothing };
};

export default useSearchUser;
