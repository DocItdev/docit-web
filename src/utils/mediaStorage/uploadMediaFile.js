import axios from "axios";
import env from "../../config/envConfig";

export default async function uploadMediaFile(userToken, mediaBlobUrl, fileName = 'blob') {
  if (userToken) {
    const localRes = await fetch(mediaBlobUrl);
    const blob = await localRes.blob();
    const formData = new FormData();
    formData.append('media_file', blob, fileName);
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = await axios.post(`${env.API_HOST}/api/storage`, formData, opts);
    
    return response.data;
  }

  throw new Error('Missing or incorrect user token.');
}