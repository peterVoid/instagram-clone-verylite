import { create } from "zustand";
import { Postingan } from "../modelPost";

interface CreatePost {
  posts: Postingan[];
  createPost: (Postingan: Postingan) => void;
  deletePost: (id: string) => void;
  setPosts: (Postingan: Postingan[]) => void;
}

const useCreatePosts = create<CreatePost>((set) => ({
  posts: [],
  createPost: (Postingan: Postingan) =>
    set((state) => ({ posts: [Postingan, ...state.posts] })),
  deletePost: (id: string) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    })),
  setPosts: (Postingan: Postingan[]) => set({ posts: Postingan }),
}));
export default useCreatePosts;
