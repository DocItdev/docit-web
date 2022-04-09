import axios from "axios";
import getVar from "../../config/envConfig";

export default async function fetchMediaFile(userToken, filePath) {
  if (userToken) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    };
    let response = await axios.get(`${getVar('API_HOST')}/api/storage?filePath=${filePath}`, opts);
    response = await fetch(response?.data?.mediaDownloadUrl);
    const blob = await response.blob();
    const mediaBlobUrl = URL.createObjectURL(blob);
    return { mediaBlobUrl };
  }
  throw new Error('Missing or incorrect user token.');
}