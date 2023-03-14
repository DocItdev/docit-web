import axios from "axios";
import env from "../../config/envConfig";

export default async function getDocument(
  userToken: string,
  projectId: string,
  docId: string
) {
  if (userToken) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const response = await axios.get(
      `${env.API_HOST}/api/documents/${projectId}/${docId}`,
      opts
    );
    return response.data;
  }
  throw new Error("Missing or incorrect user token");
}
