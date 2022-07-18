import axios from "axios";
import { WorkspaceType } from "../../@types/Workspace.";
import env from "../../config/envConfig";

export default async function postWorkspace(
  userToken: string,
  workspaceData: WorkspaceType
) {
  if (userToken) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const response = await axios.post(
      `${env.API_HOST}/api/workspaces`,
      workspaceData,
      opts
    );
    return response.data;
  }
}
