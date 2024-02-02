import { useEffect, useState } from "react";
import useLogin from "../store/useLogin";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import DetailUser from "../model";

const useSuggestedUser = () => {
  const [suggestedUser, setSuggestedUser] = useState<DetailUser[]>([]);
  const userNow = useLogin((state) => state.user);

  useEffect(() => {
    const fetchSuggestedUser = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("uid", "not-in", [userNow.uid, ...userNow.following])
        );
        const querySnapShot = await getDocs(q);
        let arr: DetailUser[] = [];
        querySnapShot.forEach((doc) => {
          arr.push(doc.data() as DetailUser);
        });
        setSuggestedUser(arr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSuggestedUser();
  }, [userNow.following, userNow.uid]);
  return suggestedUser;
};

export default useSuggestedUser;
