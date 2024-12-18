export interface PostType {
  id?: string;
  postType: string;
  title?: string;
  description?: string;
  textContent?: string;
  mediaFilePath?: string;
  index?: number;
}

export interface PostIndex {
  id: string;
  index: number;
}