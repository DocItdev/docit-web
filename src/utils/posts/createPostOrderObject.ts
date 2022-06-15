import { PostType, PostIndex } from "../../@types/Post";

export default function createPostOrderObject(
  data: PostType[],
  startIndex: number,
  endIndex: number
) {
  const postIndexes: PostIndex[] = [];
  for (let i = startIndex; i <= endIndex; i++) {
    const postIndex = { id: data[i].id, index: i };
    postIndexes.push(postIndex);
  }

  return postIndexes;
}
