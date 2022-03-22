import axios from "axios";
import getVar from "../../config/envConfig";

export default async function fetchAllPost(userToken, docId) {
  if (userToken && docId) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    };
    const response = await axios.get(`${getVar('API_HOST')}/api/posts?doc_id=${docId}`, opts);
    return response.data;
  }
  throw new Error('Missing or incorrect user token or docId.');
}