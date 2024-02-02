import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginAuth from "./pages/LoginAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import { Flex, Spinner } from "@chakra-ui/react";
import useLogin from "./store/useLogin";
import ProfileUser from "./components/ProfileUser/ProfileUser";

function App() {
  const [user, loading] = useAuthState(auth);
  const userNow = useLogin((state) => state.user);
  if (loading && !user) {
    return (
      <Flex w="full" h="100vh" justifyContent={"center"} alignItems={"center"}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginAuth /> : <Navigate to="/" />}
        />
        <Route path="/:username" element={<ProfileUser />} />
      </Routes>
    </>
  );
}

export default App;
