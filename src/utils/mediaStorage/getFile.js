import axios from "axios";
import env from "../../config/envConfig";

export default async function getFile(userToken, filePath) {
  if (userToken) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    };
    let response = await axios.get(`${env.API_HOST}/api/storage?filePath=${filePath}`, opts);
    return response.data;
  }
  throw new Error('Missing or incorrect user token.');
}