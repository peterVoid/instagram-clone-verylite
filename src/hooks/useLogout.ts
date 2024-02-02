import { useState } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useLogin from "../store/useLogin";

const useLogout = () => {
  const [loading, setIsLoading] = useState<boolean>(false);
  const [signOut] = useSignOut(auth);
  const logoutUserOnStore = useLogin((state) => state.logout);
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut();
      localStorage.removeItem("user");
      logoutUserOnStore();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    handleLogout,
    loading,
  };
};

export default useLogout;
