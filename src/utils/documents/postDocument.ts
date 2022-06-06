import axios from "axios";
import env from "../../config/envConfig";
import { DocumentType } from "../../@types/Document";

export default async function postDocument(
  userToken: string,
  projectId: string,
  document: DocumentType
) {
  if (userToken) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const url = `${env.API_HOST}/api/documents?projectId=${projectId}`;
    const response = await axios.post(url, document, opts);
    return response.data;
  }
}
