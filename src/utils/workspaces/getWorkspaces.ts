import axios from "axios";
import env from "../../config/envConfig";

export default async function getWorkspaces(
  userToken: string,
) {
  if (userToken) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const response = await axios.get(
      `${env.API_HOST}/api/workspaces/all`,
      opts
    );
    return response.data;
  }
}
