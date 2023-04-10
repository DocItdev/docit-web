import axios from "axios";
import env from "../../config/envConfig";

export default async function getFile(userToken: string, fileKey: string) {
  if (userToken) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    };
    const response = await axios.get(`${env.API_HOST}/api/storage/${fileKey}`, opts);
    return response.data;
  }
  throw new Error('Missing or incorrect user token.');
}