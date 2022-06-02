import axios from "axios";
import env from "../../config/envConfig";

export default async function createPost(userToken, docId, postData) {
  if (userToken && docId) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    };
    const response = await axios.post(`${env.API_HOST}/api/posts?doc_id=${docId}`, postData, opts);
    return response.data;
  }
  throw new Error('Missing or incorrect user token or docId.');
}