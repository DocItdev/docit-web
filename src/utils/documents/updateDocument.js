import axios from "axios";
import getVar from "../../config/envConfig";

export default async function updateDocument(userToken, docId, docData) {
  if(userToken && docId) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    };
    const response = await axios.put(`${getVar('API_HOST')}/api/documents/${docId}`, docData, opts);
    return response.data;
  }
  throw new Error('Missing document id and/or user token');
}