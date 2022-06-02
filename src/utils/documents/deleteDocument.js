import axios from "axios";
import env from "../../config/envConfig";

export default async function deleteDocument(docId, userToken) {
  if(docId) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    };
    const response = await axios.delete(`${env.API_HOST}/api/documents/${docId}`, opts);
    return response.data;
  }
  throw new Error('Missing document id');
}