import axios from "axios";
import getVar from "../../config/envConfig";

export default async function deletePost(userToken, docId, postId) {
  if (userToken && docId) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const response = await axios.delete(
      `${getVar("API_HOST")}/api/posts/${postId}?doc_id=${docId}`,
      opts
    );
    return response.data;
  }
  throw new Error("Missing or incorrect user token or docId.");
}
