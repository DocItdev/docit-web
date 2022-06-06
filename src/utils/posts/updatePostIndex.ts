import axios from "axios";
import env from "../../config/envConfig";
import { PostIndex } from "../../@types/Post";

export default async function updatePostIndex(
  userToken: string,
  docId: string,
  postIndexes: PostIndex[]
) {
  if (userToken && docId) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const postData = {
      docId,
      postIndexes,
    };
    const response = await axios.put(
      `${env.API_HOST}/api/posts/index`,
      postData,
      opts
    );
    return response.data;
  }
  throw new Error("Missing or incorrect user token or docId.");
}
