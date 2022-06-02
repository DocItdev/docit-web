import axios from "axios";
import env from "../../config/envConfig";

export default async function deletePost(userToken, docId, postData) {
  if (userToken && postData.id) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const { id: postId, postType, mediaFilePath } = postData;
    if (postType === 'video') {
      await axios.delete(
        `${env("API_HOST")}/api/storage?filePath=${mediaFilePath}`,
        opts
      );
    }
    const response = await axios.delete(
      `${env("API_HOST")}/api/posts/${postId}?doc_id=${docId}`,
      opts
    );
    return response.data;
  }
  throw new Error("Missing or incorrect user token or docId.");
}
