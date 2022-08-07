import axios from "axios";
import env from "../../config/envConfig";

export default async function getWorkspaceById(
  userToken: string,
  workspaceId: string,
) {
  if (userToken) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const response = await axios.get(
      `${env.API_HOST}/api/workspaces/${workspaceId}`,
      opts
    );
    return response.data;
  }
}
