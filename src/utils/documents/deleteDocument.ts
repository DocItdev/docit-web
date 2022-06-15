import axios from "axios";
import env from "../../config/envConfig";

export default async function deleteDocument(docId: string, userToken: string) {
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