export interface Postingan {
  id?: string;
  comments: string[];
  createdAt: number;
  createdBy: string;
  imageURL: string | null;
  isCaption: string | null;
  photoCreated: string | null;
  likes: string[];
  isTrue?: boolean;
}
