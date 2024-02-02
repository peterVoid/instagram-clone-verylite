interface DetailUser {
  uid: string | undefined;
  displayName: string | undefined | null;
  email: string | undefined | null;
  photoURL: string | undefined | null;
  followers: string[];
  following: string[];
  posts: string[];
  bio: string | undefined | null;
  createdAt: number | undefined | null;
}
export default DetailUser;
