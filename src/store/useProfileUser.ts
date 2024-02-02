import { create } from "zustand";
import DetailUser from "./../model";
interface ProfileUser {
  profileUser: any;
  setProfileUser: (user: DetailUser) => void;
}
const useProfileUser = create<ProfileUser>((set) => ({
  profileUser: null,
  setProfileUser: (profileUser) => set({ profileUser }),
}));
export default useProfileUser;
