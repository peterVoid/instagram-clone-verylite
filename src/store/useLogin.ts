import { create } from "zustand";
import DetailUser from "../model";

interface User {
  user: any;
  setUser: (user: DetailUser) => void;
  logout: () => void;
}
const useLogin = create<User>((set) => ({
  user: JSON.parse(localStorage.getItem("user")),
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useLogin;
