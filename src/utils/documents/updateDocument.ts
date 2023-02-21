import axios from "axios";
import env from "../../config/envConfig";
import { DocumentType } from "../../@types/Document";

export default async function updateDocument(
  userToken: string,
  docId: string,
  docData: DocumentType
) {
  if (userToken && docId) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const response = await axios.put(
      `${env.API_HOST}/api/documents`,
      docData,
      opts
    );
    return response.data;
  }
  throw new Error("Missing document id and/or user token");
}
