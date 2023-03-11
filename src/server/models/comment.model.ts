
export interface ICommentInfo {
  slug: string;
  id?: number;
  author?: string;
  content: string;
  liked?: number;
  disliked?: number;
  alreadyLike?: boolean;
  createdAt?: string;
}
