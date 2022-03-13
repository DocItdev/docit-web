import axios from "axios";
import getVar from "../../config/envConfig";

export default async function updatePost(userToken, docId, postId, postData) {
  if (userToken && docId) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const response = await axios.put(
      `${getVar("API_HOST")}/api/posts/${postId}?doc_id=${docId}`,
      postData,
      opts
    );
    return response.data;
  }
  throw new Error("Missing or incorrect user token or docId.");
}
