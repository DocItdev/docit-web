import axios from "axios";
import env from "../../config/envConfig";

export default async function deleteProject(
  projectId: string,
  userToken: string,
  workspaceId: string
) {
  if (projectId) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const response = await axios.delete(
      `${env.API_HOST}/api/projects/${projectId}?workspaceId=${workspaceId}`,
      opts
    );
    return response.data;
  }
  throw new Error("Missing project id");
}
