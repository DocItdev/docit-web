import axios from "axios";
import getVar from "../../config/envConfig";

export default async function getFile(userToken, filePath) {
  if (userToken) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    };
    let response = await axios.get(`${getVar("API_HOST")}/api/storage?filePath=${filePath}`, opts);
    return response.data;
  }
  throw new Error('Missing or incorrect user token.');
}