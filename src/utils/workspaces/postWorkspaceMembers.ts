import axios from "axios";
import { WorkspaceUsers } from "../../@types/Workspace.";
import env from "../../config/envConfig";

export default async function postWorkspaceMembers(
  userToken: string,
  workspaceData: WorkspaceUsers
) {
  if (userToken) {
    const opts = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const response = await axios.post(
      `${env.API_HOST}/api/workspaces/member/all`,
      workspaceData,
      opts
    );
    return response.data;
  }
}
