import axios from "axios";
import env from "../../config/envConfig";
import getFile from "./getFile";

export default async function uploadMediaFile(
  userToken: string,
  mediaBlobUrl: string,
  docId: string,
  fileName = "blob"
) {
  if (userToken) {
    const localRes = await fetch(mediaBlobUrl);
    const blob = await localRes.blob();
    const formData = new FormData();
    formData.append("media_file", blob, fileName);
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(
      `${env.API_HOST}/api/storage/${docId}`,
      formData,
      opts
    );
    const fileData = await getFile(userToken, response.data.key);

    return { ...response.data, url: fileData.mediaDownloadUrl };
  }

  throw new Error("Missing or incorrect user token.");
}
