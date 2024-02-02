import { useState, useEffect } from "react";
import useLogin from "./../store/useLogin";
import useProfileUser from "./../store/useProfileUser";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "./../firebase/firebase";

const useCheckFollowOrNot = (uidTarget: string) => {
  const [follow, setFollow] = useState(false);
  const userNow = useLogin((state) => state.user);
  const userNowFollowing = useLogin((state) => state.setUser);
  const targetUser = useProfileUser((state) => state.profileUser);
  const targetUserUnfol = useProfileUser((state) => state.setProfileUser);

  useEffect(() => {
    const checkUserAlreadyFollowOrNot = userNow.following.includes(uidTarget);
    setFollow(checkUserAlreadyFollowOrNot);
  }, [uidTarget]);

  const handleFollowAndUnfollow = async () => {
    const docNow = doc(db, "users", userNow.uid);
    const docTarget = doc(db, "users", uidTarget);
    try {
      await updateDoc(docNow, {
        following: follow ? arrayRemove(uidTarget) : arrayUnion(uidTarget),
      });
      await updateDoc(docTarget, {
        followers: follow ? arrayRemove(userNow.uid) : arrayUnion(userNow.uid),
      });
      if (follow) {
        userNowFollowing({
          ...userNow,
          following: userNow.following.filter(
            (uid: string) => uid !== uidTarget
          ),
        });
        targetUserUnfol({
          ...targetUser,
          followers: targetUser.followers.filter(
            (uid: string) => uid !== userNow.uid
          ),
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...userNow,
            following: userNow.following.filter(
              (uid: string) => uid !== uidTarget
            ),
          })
        );
        setFollow(false);
      } else {
        userNowFollowing({
          ...userNow,
          following: [...userNow.following, uidTarget],
        });
        targetUserUnfol({
          ...targetUser,
          followers: [...targetUser.followers, userNow.uid],
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...userNow,
            following: [...userNow.following, uidTarget],
          })
        );
        setFollow(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { follow, handleFollowAndUnfollow, setFollow, targetUser };
};

export default useCheckFollowOrNot;
