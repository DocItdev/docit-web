import axios from "axios";
import env from "../../config/envConfig";
import { DocumentType } from "../../@types/Document";

export default async function updateDocument(
  userToken: string,
  document: DocumentType
) {
  if (userToken) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const url = `${env.API_HOST}/api/documents`;
    const response = await axios.put(url, document, opts);
    return response.data;
  }
}
