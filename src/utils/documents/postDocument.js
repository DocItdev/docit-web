import axios from "axios";
import getVar from "../../config/envConfig";

export default async function postDocument(userToken, projectId, document) {
  if (userToken) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`
      },
    };
    const url = `${getVar('API_HOST')}/api/documents?projectId=${projectId}`;
    const response = await axios.post(url, document, opts);
    return response.data;
  }
}
