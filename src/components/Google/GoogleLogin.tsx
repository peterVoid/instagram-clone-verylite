import { Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import DetailUser from "./../../model";
import { auth, db } from "../../firebase/firebase";
import useLogin from "../../store/useLogin";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
const GoogleLogin = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const loginStore = useLogin((state) => state.setUser);
  const docRef = collection(db, "users");
  const handleLoginWithGoogle = async () => {
    try {
      const googleLog = await signInWithGoogle();
      const docUs = doc(db, "users", googleLog?.user.uid);
      const docSnap = await getDoc(docUs);
      if (docSnap.exists()) {
        loginStore(docSnap.data() as DetailUser);
        localStorage.setItem(
          "user",
          JSON.stringify(docSnap.data() as DetailUser)
        );
      } else {
        const propsUser: DetailUser = {
          uid: googleLog?.user.uid,
          displayName: googleLog?.user.email.split("@")[0],
          email: googleLog?.user.email,
          photoURL: googleLog?.user.photoURL,
          bio: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(docRef, googleLog?.user.uid), propsUser);
        localStorage.setItem("user", JSON.stringify(propsUser));
        loginStore(propsUser);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button onClick={handleLoginWithGoogle}>
      Login With Google <FcGoogle style={{ marginLeft: "10px" }} />
    </Button>
  );
};

export default GoogleLogin;
